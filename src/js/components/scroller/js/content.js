import React, { useEffect, useRef } from 'react';
import { useSpring, useTrail, a } from 'react-spring';
import useTouchScroller from '../../../hooks/touchScroller.js'

function Content({ prop, content, setIntersecting, setIntersectingName }) {
    const imageRef = useRef([])
    const scrollWidth = -prop.deviceWidth * 0.8 - 16
    const { counter, touchStart, touchMove, touchEnd } = useTouchScroller(prop, content, scrollWidth)

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,0,0)` : `translate3d(${counter}px,0,0)`,
        config: { mass: 1, tension: 270, friction: 30 }
    })
    const { o, b } = useSpring({
        from: { o: 0 },
        o: Math.abs(((-counter / (prop.deviceWidth * 0.8)) - prop.intersecting) * 2.2),
        b: prop.openLevel2 ? 1 : 0
    })
    const trail = useTrail(content.length, {
        transform: prop.openLevel1 ? "translateY(0px)" : "translateY(100%)",
        config: { mass: 1, tension: 200, friction: 20 }
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryData = entry.target.dataset
                    setIntersecting(parseInt(entryData.img))
                    setIntersectingName(entryData.name)
                }
            }, { root: null, rootMargin: "0px", threshold: 0.4 }
        );

        imageRef.current.forEach(image => {
            observer.observe(image);
        })

        return () => observer.disconnect();

    }, [setIntersecting, setIntersectingName])

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
                        style={{ opacity: prop.intersecting === i ? (prop.openLevel2 ? b : o.interpolate(o => `${o}`)) : 1 }}
                        src={content[i].blur} alt="" />
                </a.div>
            ))}
        </a.div>
    )
}

export default Content