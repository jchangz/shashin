import React, { useCallback, useState } from 'react';
import { useTrail, useSpring, useTransition, a } from 'react-spring';
import { camerarollroutes, camerarollcontent, iconclose } from './images.js';
import './cameraroll.scss';
import useImageLoaded from '../../hooks/useImageLoaded.js';
import Lightbox from '../../components/lightbox/index.js';
import Scroller from '../../components/scroller/index.js';

function CameraRollContent({ content, image, setImage }) {
  //image, setImage defined in parent to hide button on lightbox load
  const { loading, imageLoaded } = useImageLoaded(content)
  const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })

  const clicked = (index, e) => {
    setImage(index)
    document.querySelector('.lightbox').style.setProperty("transform-origin", `${e.pageX}px ${e.pageY}px`);
  }

  return (
    <div className="cr-content">
      <div className="cr-content-grid">
        {trail.map((trail, index) =>
          <div className="cr-img">
            <div className="img-preview">
              <img src={content[index].thumbnail} alt="" />
            </div>
            <div className="img-full">
              <a.img style={trail}
                onClick={loading ? null : (e) => clicked(index, e)}
                onLoad={imageLoaded}
                src={content[index].url} alt="" />
            </div>
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
  const [title, setTitle] = useState(null);
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
  const updateTitle = useCallback((title) => {
    setTitle(title)
  }, [setTitle])

  const transitions = useTransition(title, null, {
    from: { position: 'absolute', transform: 'translate3d(0,100%,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,100%,0)', opacity: 0 },
  })
  const openRoute = useSpring({
    transform: open ? 'translateY(0)' : 'translateY(110%)'
  })
  const fadeGrid = useSpring({
    transform: childOpen ? 'translate3d(0%,0,0)' : 'translate3d(0%,-100%,0)'
  })
  const fadeButton = useSpring({
    height: open ? 50 : 0,
    transform: (hide === null) ? 'translate3d(-50%,0%,0)' : 'translate3d(-50%,200%,0)'
  })
  const fadeTitle = useSpring({
    opacity: open ? 1 : 0
  })

  return (
    <div className="cr">
      <a.div className="cr-main" style={fadeGrid}>
        <Scroller
          click={selectImage}
          content={camerarollroutes}
          onLoad={preLoad}
          open={childOpen}
          imgopen={open}
          setTitle={updateTitle}
          animation="explode" />
      </a.div>
      <a.div className="cr-container" style={openRoute}>
        {route ?
          <CameraRollContent
            content={route}
            image={hide}
            setImage={setHide} />
          : null
        }
      </a.div>
      <a.div className="cr-title">
        <a.span className="cr-title-overlay" style={fadeTitle} />
        <h2>Camera Roll</h2>
        {transitions.map(({ item, props, key }) =>
          <a.h3 key={key} style={props}>{item}</a.h3>
        )}
      </a.div>
      <a.div className="button btn-close fxd white" style={fadeButton}
        onClick={returnHome}>
        <img src={iconclose} alt="" />
      </a.div>
    </div>
  )
}

export default CameraRoll;