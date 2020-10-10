import React, { useState, useEffect } from 'react';
import { useSpring, a } from 'react-spring';
import { camerarollroutes, camerarollcontent } from './js/images.js';
import Scroller from '../../components/scroller/index.js';
import Content from './js/content.js';
import './cameraroll.scss';

const CameraRoll = ({ preloadContent, setPreloadLength, openLevel1, openLevel2, setOpenLevel2, openLightBox, setOpenLightBox }) => {

  const [route, setRoute] = useState(null)

  const openRoute = useSpring({
    transform: openLevel2 ? 'translateY(0)' : 'translateY(110%)'
  })
  const fadeGrid = useSpring({
    transform: openLevel1 ? 'translate3d(0%,0,0)' : 'translate3d(0%,-100%,0)'
  })

  const selectImage = (e) => {
    if (route === null) {
      const openRoute = `${e.target.dataset.click}`
      const openRouteContent = camerarollcontent.find(route => route.name === openRoute)
      setOpenLevel2(true)
      setRoute(openRouteContent.images)
    }
  }

  useEffect(() => {
    setPreloadLength(camerarollroutes.length)
  }, [setPreloadLength])


  useEffect(() => {
    if (openLevel2 === false) {
      setOpenLevel2(false)
      setTimeout(() => {
        //delay to remove content once transition finishes
        setRoute(null)
      }, 475);
    }
  }, [openLevel2, setOpenLevel2])

  return (
    <div className="cr">
      <a.div className="cr-main" style={fadeGrid}>
        <Scroller
          content={camerarollroutes}
          preloadContent={preloadContent}
          openLevel1={openLevel1}
          openLevel2={openLevel2}
          selectImage={selectImage} />
      </a.div>
      <a.div className="cr-container" style={openRoute}>
        {route ?
          <Content
            content={route}
            openLightBox={openLightBox}
            setOpenLightBox={setOpenLightBox} />
          : null
        }
      </a.div>
    </div>
  )
}

export default CameraRoll;