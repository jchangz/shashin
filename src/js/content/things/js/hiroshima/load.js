import React from 'react';
import { useSpring, a } from 'react-spring';
import { hiroshimaText, hiroshimaLoad } from '../../js/images.js'
import '../../things.scss';

function HiroshimaLoad({ prop }) {

    const { o, b, } = useSpring({
        from: { o: 0, b: 0 },
        o: 1 - ((prop.scrollLeft - prop.thingwidth) / 600),
        b: 500 - (prop.scrollLeft - prop.thingwidth) / 2,
        immediate: true,
    })
    const setWidth = useSpring({
        width: prop.loadedImageFlag === true ? (window.innerWidth * 2) : window.innerWidth
    })
    const fadeIn = useSpring({
        opacity: prop.loadedImageFlag === true ? 1 : 0,
    })
    const fadeOut = useSpring({
        opacity: prop.loadedImageFlag === true ? 0 : 1,
    })

    return (
        <a.div className="th-sticky-load" ref={ref => prop.imageRef.current[0] = ref} >
            <a.div className="th-sticky-content">
                <a.h2>{prop.title}</a.h2>
                <a.h2>Loading...</a.h2>
                <a.div className="th-sticky-load-hiroshima">
                    <div className="hiroshima-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 373 95.91">
                            <a.path className="st0 svht" stroke="#a9c0ed"
                                style={{ strokeDashoffset: prop.intersecting === "th-sticky-load" ? b.interpolate(b => `${b}`) : null }}
                                d={hiroshimaText.welcomeTo} />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.84 121.99">
                            <a.path className="st0 svht" stroke="#e55145"
                                style={{ strokeDashoffset: prop.intersecting === "th-sticky-load" ? b.interpolate(b => `${b}`) : null }}
                                d={hiroshimaText.hiroshima} />
                        </svg>
                    </div>
                    <img src={hiroshimaLoad} />
                </a.div>
                <a.div className="th-sticky-overlay"
                    style={{ background: prop.intersecting === "th-sticky-load" ? o.interpolate(o => `rgba(0, 0, 0, ${o})`) : "#000" }} />
            </a.div>
        </a.div>
    )
}

export default HiroshimaLoad