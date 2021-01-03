import React, { useEffect, useRef, useContext } from 'react';
import { useSpring, a } from 'react-spring';
import useTouchScroller from '../../../hooks/touchScroller.js';
import { OpenContext } from "../../../main/context/openContext.js";
import { LightboxContext } from "./lightboxContext.js";
import useObserver from './observer.js';

function Content({ content }) {
    const { imageRef } = useObserver()
    const immediate = useRef(true)
    const { stateOpen, dispatchOpen } = useContext(OpenContext);
    const { stateLightbox, dispatchLightbox } = useContext(LightboxContext);
    const deviceWidth = window.innerWidth
    const { counter, touchStart, touchMove, touchEnd, setCounter } = useTouchScroller(stateLightbox.intersecting, content, -deviceWidth)

    useEffect(() => {
        if (stateOpen.lightbox === true) {
            setTimeout(() => {
                immediate.current = false
            }, 275);
        }
    }, [stateOpen.lightbox])

    useEffect(() => {
        if (stateLightbox.selected !== null) {
            setCounter(-deviceWidth * stateLightbox.selected)
        }
    }, [stateLightbox.selected, deviceWidth, setCounter])

    const closeLightbox = () => {
        dispatchOpen({ type: 'closeLightbox' })
        dispatchLightbox({ type: 'closeLightbox' })
    }

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: immediate.current === false ? { mass: 1, tension: 270, friction: 30 } : { duration: 1 }
    })

    return (
        <a.div className="lightbox-content"
            style={scroll}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}>
            {content.map((item, i) => (
                <a.div className="lightbox-content-img" key={i}>
                    <div className="lightbox-content-text">
                        <p>Location: {item.location}</p>
                    </div>
                    <div className="lightbox-content-img-blur"
                        ref={ref => imageRef.current[i] = ref}
                        data-intersecting={i}
                        onClick={closeLightbox} >
                        <img className="lightbox-content-img-main"
                            src={item.url + "?w=200"} alt="" /></div>
                    <img className="lightbox-content-img-main"
                        src={stateLightbox.intersecting === i ? item.url + "?w=828" : null} alt="" />
                </a.div>
            ))}
        </a.div>
    )
}

export default Content