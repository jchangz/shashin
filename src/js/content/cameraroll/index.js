import React, { useState } from 'react';
import { useSpring, a } from 'react-spring';
import { camerarollroutes, camerarollcontent } from './js/images.js';
import Scroller from '../../components/scroller/index.js';
import Content from './js/content.js';
import Close from './js/close.js';
import './cameraroll.scss';

const CameraRoll = ({ preLoad, childOpen, childchildOpen }) => {

  const [route, setRoute] = useState(null);
  const [open, setOpen] = useState(null);
  const [hide, setHide] = useState(null); //hide when lightbox is opened

  const openRoute = useSpring({
    transform: open ? 'translateY(0)' : 'translateY(110%)'
  })
  const fadeGrid = useSpring({
    transform: childOpen ? 'translate3d(0%,0,0)' : 'translate3d(0%,-100%,0)'
  })

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
        {route ?
          <Content
            content={route}
            image={hide}
            setImage={setHide} />
          : null
        }
      </a.div>

      <Close
        prop={{ open, hide }}
        returnHome={returnHome}
      />

    </div>
  )
}

export default CameraRoll;