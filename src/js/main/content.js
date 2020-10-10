import React, { useState, useRef } from 'react';
import { useSpring, a } from 'react-spring';
import CameraRoll from '../content/cameraroll/index.js';

function Content({ prop, setLoadLevel1, setOpenLevel2, setOpenLightBox }) {

    const [preloadLength, setPreloadLength] = useState(0);
    const preloadCounter = useRef(0);

    const fadeChild = useSpring({ transform: prop.openLevel1 ? 'translateY(-100%)' : 'translateY(10%)' })

    const preloadContent = () => {
        preloadCounter.current += 1;
        if (preloadCounter.current >= preloadLength) {
            setLoadLevel1(false)
            preloadCounter.current = 0
        }
    }

    return (
        <a.div className="main-content" style={fadeChild}>
            {prop.index === 4 ?
                <CameraRoll
                    preloadContent={preloadContent}
                    setPreloadLength={setPreloadLength}
                    openLevel1={prop.openLevel1}
                    openLevel2={prop.openLevel2}
                    setOpenLevel2={setOpenLevel2}
                    openLightBox={prop.openLightBox}
                    setOpenLightBox={setOpenLightBox}
                /> : null
            }
        </a.div>
    )
}

export default Content