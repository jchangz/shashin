import React, { useState } from 'react';
import { useTrail, useSpring, useTransition, a } from 'react-spring';
import { camerarollroutes, camerarollkyoto, camerarolljapan, iconclose } from './images.js';
import useImageLoaded from '../hooks/useImageLoaded.js';
import useImageObserver from '../hooks/useImageObserver.js';
import Lightbox from './lightbox/index.js';

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
  const { imageRef, intersecting } = useImageObserver()
  const [route, setRoute] = useState(null);
  const [open, setOpen] = useState(null);
  const [hide, setHide] = useState(null); //hide when lightbox is opened

  const selectImage = (e) => {
    const openRoute = e.target.className
    setOpen(true)
    childchildOpen(true)
    if (openRoute === "Kyoto") { setRoute(camerarollkyoto) }
    if (openRoute === "Japan") { setRoute(camerarolljapan) }
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
  const fadeMain = useSpring({ opacity: childOpen ? 1 : 0 })
  const scaleMain = useSpring({ transform: childOpen ? 'scale(1)' : 'scale(1.5)' })
  const fadeGrid = useSpring({ opacity: open ? 0 : 1, transform: childOpen ? 'translateY(0%)' : 'translateY(-100%)' })
  const fadeTitle = useSpring({ opacity: childOpen ? 1 : 0, delay: 250 })
  const showTitle = useSpring({ transform: childOpen ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)', delay: 250 })
  const fadeButton = useSpring({ height: open ? 72 : 0, transform: (hide === null) ? 'translate3d(-50%,0%,0)' : 'translate3d(-50%,100%,0)' })
  const transitions = useTransition(intersecting, null, {
    from: { position: 'absolute', transform: 'translate3d(0,100%,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,100%,0)', opacity: 0 },
  })

  return (
    <a.div className="cr" style={fadeMain}>

      <a.div className="cr-title" style={fadeTitle}>
        <div>
          <a.h2 style={showTitle}>Camera Roll</a.h2>
        </div>
        <div className="cr-title-route">
          {transitions.map(({ item, props, key }) =>
            <a.h2 key={key} style={props}>{item}</a.h2>
          )}
        </div>
      </a.div>

      <a.div className="cr-grid" style={fadeGrid}>
        {camerarollroutes.map(({ routeName }, i) =>
          <div key={routeName} onClick={route ? null : (e) => selectImage(e)}>
            <a.img ref={ref => imageRef.current[i] = ref}
              className={camerarollroutes[i].routeName}
              style={scaleMain}
              onLoad={preLoad}
              src={camerarollroutes[i].url} alt="" />
          </div>
        )}
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