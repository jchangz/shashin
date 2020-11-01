import React, { useEffect, useState } from 'react';
import { useSpring, a } from 'react-spring';
import { hiroshimaText, hiroshimaContent } from '../js/images.js'
import '../things.scss';

function Loading({ prop }) {
    const o = prop.o
    const b = prop.b
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
        <a.div className="th-loading-container-3" style={setWidth}  >
            <a.div className="th-loading-container-2" >
                <a.h2 style={fadeIn}>{prop.title}</a.h2>
                <a.h2 style={fadeOut} className="th-loading-title">Loading...</a.h2>
                {prop.loadedImageFlag ?
                    <div className="th-loading-container">

                        <div className="hiroshima">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 373 95.91">
                                <a.path className="st0 svht" stroke="#283574" style={{ strokeDashoffset: prop.intersecting === "th-loading" ? b.interpolate(b => `${b}`) : null }}
                                    d={hiroshimaText.welcomeTo} />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.84 121.99">
                                <a.path className="st0 svht" stroke="#e55145" style={{ strokeDashoffset: prop.intersecting === "th-loading" ? b.interpolate(b => `${b}`) : null }}
                                    d={hiroshimaText.hiroshima} />
                            </svg>
                        </div>
                        <img style={{ width: "80%" }} src="https://live.staticflickr.com/65535/50504100842_6b29acd783_o.jpg"></img>
                    </div> : null}
                <a.div style={{ background: prop.intersecting === "th-loading" ? o.interpolate(o => `rgba(0, 0, 0, ${o})`) : "#000" }} className="img-cover"></a.div>
            </a.div>

        </a.div>
    )
}

export default Loading