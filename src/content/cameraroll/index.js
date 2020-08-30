import React, { useState } from 'react';
import { useTrail, useSpring, a } from 'react-spring';
import { camerarollroutes, camerarollcontent, iconclose } from './images.js';
import './cameraroll.scss';
import useImageLoaded from '../../hooks/useImageLoaded.js';
import Lightbox from '../../components/lightbox/index.js';
import Scroller from '../../components/scroller/index.js';

function CameraRollContent({ content, image, setImage }) {
  //image, setImage defined in parent to hide button on lightbox load
  const { loading, imageLoaded } = useImageLoaded(content)
  const fadeOut = useSpring({ opacity: loading ? 1 : 0 })
  const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })

  const clicked = (index, e) => {
    setImage(index)
    document.querySelector('.lightbox').style.setProperty("transform-origin", `${e.pageX}px ${e.pageY}px`);
  }

  return (
    <div className="cr-content">
      <div className="cr-content-grid">
        {trail.map((spring, index) =>
          <div className="reflow">
            <a.img className={content[index].name}
              style={spring}
              onClick={(e) => clicked(index, e)}
              onLoad={imageLoaded}
              src={content[index].url} alt="" />
          </div>
        )}
      </div>
      <Lightbox content={content} selected={image} setClose={setImage} />
      <div className="cr-content-loader">
        <a.div className={"progress-animation " + (loading ? "" : "fin")} style={fadeOut} />
        <div className="cr-content-grid skeleton">
          {[...Array(9)].map((i) => <div key={i}></div>)}
        </div>
      </div>
    </div>
  )
}

const CameraRoll = ({ preLoad, childOpen, childchildOpen }) => {
  const [route, setRoute] = useState(null);
  const [open, setOpen] = useState(null);
  const [hide, setHide] = useState(null); //hide when lightbox is opened

  const selectImage = (e) => {
    if (route === null) {
      const openRoute = `${e.target.dataset.click}`
      const openRouteContent = camerarollcontent.find(route => route.name === openRoute)
      setOpen(true)
      childchildOpen(true)
      setRoute(openRouteContent.images)
    }
  }

  const returnHome = () => {
    setOpen(null);
    childchildOpen(false)
    setTimeout(() => {
      //delay to remove content once transition finishes
      setRoute(null)
    }, 475);
  }

  const openRoute = useSpring({ transform: open ? 'translateY(0)' : 'translateY(100%)' })
  const fadeGrid = useSpring({ transform: childOpen ? 'translate3d(0%,0,0)' : 'translate3d(0%,-100%,0)' })
  const moveGrid = useSpring({ transform: open ? 'scale(0.9)' : 'scale(1)', opacity: open ? 0.5 : 1 })
  const fadeButton = useSpring({ height: open ? 50 : 0, transform: (hide === null) ? 'translate3d(-50%,0%,0)' : 'translate3d(-50%,200%,0)' })

  return (
    <a.div className="cr" >

      <a.div className="h100 bgdark" style={fadeGrid}>
        <a.div className="cr-main" style={moveGrid}>
          <Scroller
            click={selectImage}
            content={camerarollroutes}
            onLoad={preLoad}
            open={childOpen}
            animation="explode" />
        </a.div>
      </a.div>

      <a.div className="cr-container" style={openRoute}>
        {route ? <CameraRollContent content={route} image={hide} setImage={setHide} /> : null}
      </a.div>

      <a.div className="button btn-close fxd white" onClick={returnHome} style={fadeButton} >
        <img src={iconclose} alt="" />
      </a.div>
    </a.div>
  )
}

export default CameraRoll;