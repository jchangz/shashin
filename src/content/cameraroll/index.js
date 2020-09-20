import React, { useState } from 'react';
import { useTrail, useSpring, a } from 'react-spring';
import { camerarollroutes, camerarollcontent, iconclose } from './images.js';
import './cameraroll.scss';
import useImageLoaded from '../../hooks/useImageLoaded.js';
import Lightbox from '../../components/lightbox/index.js';
import Scroller from '../../components/scroller/index.js';

function CameraRollContent({ content, image, setImage, close }) {
  //image, setImage defined in parent to hide button on lightbox load
  const { loading, imageLoaded } = useImageLoaded(content)
  const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })
  let scrolled = false;

  const clicked = (index, e) => {
    setImage(index)
    document.querySelector('.lightbox').style.setProperty("transform-origin", `${e.pageX}px ${e.pageY}px`);
  }
  const showOverlay = (e) => {
    if (e.target.scrollTop > 10 && !scrolled) {
      scrolled = true;
      document.querySelector('.cr-overlay.top').style.setProperty("opacity", "1");
    }
  }

  return (
    <div className="cr-content">
      <div className="cr-content-grid" onScroll={showOverlay} onClick={close}>
        <span className="cr-overlay top" />
        <span className="cr-overlay bottom" onClick={close} />
        {trail.map((trail, index) =>
          <div className="reflow">
            <div className="img-preview">
              <img src={content[index].thumbnail} alt="" />
            </div>
            <a.img
              style={trail}
              onClick={loading ? null : (e) => clicked(index, e)}
              onLoad={imageLoaded}
              src={content[index].url} alt="" />
          </div>
        )}
      </div>
      <Lightbox content={content} selected={image} setClose={setImage} />
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

  const openRoute = useSpring({ transform: open ? 'translateY(0)' : 'translateY(110%)' })
  const fadeGrid = useSpring({ transform: childOpen ? 'translate3d(0%,0,0)' : 'translate3d(0%,-100%,0)' })
  const fadeButton = useSpring({ height: open ? 50 : 0, transform: (hide === null) ? 'translate3d(-50%,0%,0)' : 'translate3d(-50%,200%,0)' })

  return (
    <div className="cr">
      <a.div className="cr-main" style={fadeGrid}>
        <Scroller
          click={selectImage}
          content={camerarollroutes}
          onLoad={preLoad}
          open={childOpen}
          imgopen={open}
          animation="explode" />
      </a.div>
      <a.div className="cr-container" style={openRoute}>
        {route ? <CameraRollContent close={returnHome} content={route} image={hide} setImage={setHide} /> : null}
      </a.div>
      <a.div className="button btn-close fxd white" onClick={returnHome} style={fadeButton} >
        <img src={iconclose} alt="" />
      </a.div>
    </div>
  )
}

export default CameraRoll;