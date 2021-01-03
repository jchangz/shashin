import React, { useContext } from 'react';
import { useSpring, useTrail, a } from 'react-spring';
import useTouchScroller from '../../../hooks/touchScroller.js'
import { ScrollerContext } from "./scrollerContext.js";
import { OpenContext } from "../../../../js/main/context/openContext.js";
import useObserver from './observer.js';

function Content() {
    const { imageRef } = useObserver()
    const { stateOpen } = useContext(OpenContext);
    const { stateScroller } = useContext(ScrollerContext);
    const content = stateScroller.route
    const deviceWidth = window.innerWidth
    const scrollWidth = -deviceWidth * 0.8 - 16
    const { counter, touchStart, touchMove, touchEnd } = useTouchScroller(stateScroller.intersecting, content, scrollWidth)

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,0,0)` : `translate3d(${counter}px,0,0)`,
        config: { mass: 1, tension: 270, friction: 30 }
    })
    const trail = useTrail(content.length, {
        transform: stateOpen.openLevel1 ? "translateY(0px)" : "translateY(100%)",
        config: { mass: 1, tension: 200, friction: 20 }
    })
    const { o, b } = useSpring({
        from: { o: 0 },
        o: Math.abs(((-counter / (deviceWidth * 0.8)) - stateScroller.intersecting) * 2.2),
        b: stateOpen.openLevel2 ? 1 : 0
    })

    return (
        <a.div className="scroller-container"
            style={scroll}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}>
            {trail.map((trail, i) => (
                <a.div className={"scroller-content " + content[i].class} key={i} style={trail}>
                    <a.img
                        data-name={content[i].subtitle}
                        data-img={i}
                        ref={ref => imageRef.current[i] = ref}
                        src={content[i].url} alt="" />
                    <a.img className="scroller-content-blur"
                        style={{ opacity: stateScroller.intersecting === i ? (stateOpen.openLevel2 ? b : o.interpolate(o => `${o}`)) : 1 }}
                        src={content[i].blur} alt="" />
                </a.div>
            ))}
        </a.div>
    )
}

export default Content