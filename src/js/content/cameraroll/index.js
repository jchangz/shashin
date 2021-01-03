import React, { useEffect, useContext } from 'react';
import { useTransition, a } from 'react-spring';
import Content from './js/content.js';
import { camerarollroutes, camerarollcontent } from './js/images.js';
import { LoadingContext } from "../../main/context/loadingContext.js";
import { OpenContext } from "../../main/context/openContext.js";
import { ScrollerContext } from "../../components/scroller/js/scrollerContext.js";
import { LightboxProvider } from '../../components/lightbox/js/lightboxContext.js';
import Scroller from '../../components/scroller/index.js';
import useImageLoaded from '../../hooks/useImageLoaded.js';
import './cameraroll.scss';

const CameraRoll = () => {
  const { loading } = useImageLoaded(camerarollroutes, null)
  const { dispatchLoading } = useContext(LoadingContext);
  const { stateOpen } = useContext(OpenContext);
  const { stateScroller, dispatchScroller } = useContext(ScrollerContext);

  const transitions = useTransition(stateOpen.openLevel2, null, {
    from: { opacity: 0, transform: 'scale(1.5)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(1.5)' },
  })

  useEffect(() => {
    if (loading === false) {
      dispatchLoading({ type: 'finishLoad' })
      dispatchScroller({
        type: 'setRoute',
        route: camerarollroutes
      })
    }
  }, [loading, dispatchLoading, dispatchScroller])

  useEffect(() => {
    if (stateScroller.intersecting !== null) {
      dispatchScroller({
        type: 'setImages',
        images: camerarollcontent[stateScroller.intersecting].images
      })
    }
  }, [stateScroller.intersecting, dispatchScroller])

  return (
    <div className="cr">
      <Scroller name={"cr-scroller"} />
      {transitions.map(({ item, key, props }) => item ?
        <a.div className="cr-container"
          style={props}
          key={key}>
          <LightboxProvider>
            <Content />
          </LightboxProvider>
        </a.div> : null
      )}
    </div>
  )
}

export default CameraRoll;