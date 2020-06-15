import React, { useState } from 'react';
import { useTrail, useSpring, useTransition, a, config } from 'react-spring';
import { camerarollroutes, camerarollkyoto, camerarolljapan, iconclose } from './images.js';
import useImageLoaded from '../hooks/useImageLoaded.js';
import useImageObserver from '../hooks/useImageObserver.js';

function CameraRollContent({ content }) {
  const { loading, imageLoaded } = useImageLoaded(content)
  const fadeOut = useSpring({ opacity: loading ? 1 : 0 })
  const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })

  return (
    <div className="cr-content">
      <div className="cr-content-grid">
        {trail.map((spring, index) =>
          <a.img className={content[index].name} onLoad={imageLoaded} style={spring} src={content[index].url} alt="" />
        )}
      </div>
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
  const fadeGrid = useSpring({ opacity: open ? 0 : 1, transform: childOpen ? 'translateY(0%)' : 'translateY(-100%)' })
  const fadeTitle = useSpring({ opacity: childOpen ? 1 : 0, delay: 250 })
  const fadeButton = useSpring({ height: open ? 72 : 0 })
  const transitions = useTransition(intersecting, null, {
    config: config.wobbly,
    from: { position: 'absolute', height: 0, overflow: 'hidden', opacity: 0 },
    enter: { height: 50, opacity: 1 },
    leave: { height: 0, opacity: 0 },
  })

  return (
    <a.div className="cr" style={fadeMain}>

      <a.div className="cr-title" style={fadeTitle}>
        <h2>Camera Roll</h2>
        <div className="cr-title-route">
          {transitions.map(({ item, props, key }) =>
            <a.h2 key={key} style={props}>{item}</a.h2>
          )}
        </div>
      </a.div>

      <a.div className="cr-grid" style={fadeGrid}>
        {camerarollroutes.map(({ routeName }, i) =>
          <div key={routeName} onClick={route ? null : (e) => selectImage(e)}>
            <img ref={ref => imageRef.current[i] = ref}
              className={camerarollroutes[i].routeName}
              onLoad={preLoad}
              src={camerarollroutes[i].url} alt="" />
          </div>
        )}
      </a.div>

      <a.div className="cr-container" style={openRoute}>
        {route ? <CameraRollContent content={route} /> : null}
      </a.div>

      <a.div className="button fxd" onClick={returnHome} style={fadeButton} >
        <img src={iconclose} alt="" />
      </a.div>
    </a.div>
  )
}

export default CameraRoll;