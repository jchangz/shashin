import React, { useState, useRef } from 'react';
import { useTrail, useSpring, a } from 'react-spring';
import { camerarollroutes, camerarollcontent, iconclose } from './images.js';
import useImageLoaded from '../hooks/useImageLoaded.js';
import Lightbox from './lightbox/index.js';
import Scroller from './scroller/index.js';

function CameraRollContent({ content, image, setImage }) {
  //image, setImage defined in parent to hide button on lightbox load
  const { loading, imageLoaded } = useImageLoaded(content)
  const fadeOut = useSpring({ opacity: loading ? 1 : 0 })
  const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })

  const clicked = (index) => {
    setImage(index)
  }

  return (
    <div className="cr-content">
      <div className="cr-content-grid">
        {trail.map((spring, index) =>
          <div className="reflow">
            <a.img className={content[index].name}
              style={spring}
              onClick={() => clicked(index)}
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
  const routeName = useRef(null);
  const [open, setOpen] = useState(null);
  const [hide, setHide] = useState(null); //hide when lightbox is opened

  const selectImage = (e) => {
    const openRoute = `${e.target.dataset.click}`
    const openRouteContent = camerarollcontent.find(route => route.name === openRoute)
    routeName.current = e.target.dataset.click
    setOpen(true)
    childchildOpen(true)
    setRoute(openRouteContent.images)
  }

  const returnHome = () => {
    setOpen(null);
    childchildOpen(false)
    setTimeout(() => {
      //delay to remove content once transition finishes
      setRoute(null)
    }, 475);
  }

  const openRoute = useSpring({ transform: open ? 'translateX(0)' : 'translateX(-100%)' })
  const fadeGrid = useSpring({ transform: childOpen ? 'translate3d(0%,0,0)' : 'translate3d(0%,-100%,0)' })
  const moveGrid = useSpring({ transform: open ? 'translate3d(100%,0,0)' : 'translate3d(0%,0,0)' })
  const showTitle = useSpring({ opacity: open ? 1 : 0, transform: open ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)' })
  const fadeButton = useSpring({ height: open ? 72 : 0, transform: (hide === null) ? 'translate3d(-50%,0%,0)' : 'translate3d(-50%,100%,0)' })

  return (
    <a.div className="cr" >
      <a.h2 className="cr-title" style={showTitle}>{routeName.current}</a.h2>

      <a.div className="h100" style={fadeGrid}>
        <a.div className="h100" style={moveGrid}>
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

      <a.div className="button fxd" onClick={returnHome} style={fadeButton} >
        <img src={iconclose} alt="" />
      </a.div>
    </a.div>
  )
}

export default CameraRoll;