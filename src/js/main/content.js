import React, { useState, useEffect } from 'react';
import { useSpring, a } from 'react-spring';
import CameraRoll from '../content/cameraroll/index.js';
import Things from '../content/things/index.js';

function Content({ prop, setLoadLevel1, setOpenLevel2, setOpenLightBox }) {
    const [childLoaded, setChildLoaded] = useState(false)

    const fadeChild = useSpring({
        transform: prop.openLevel1 ? 'translateY(-100%)' : 'translateY(10%)',
        delay: (prop.openLevel1 === true) ? 0 : 250,
        immediate: true
    })

    useEffect(() => {
        if (childLoaded === true) {
            setLoadLevel1(false)
        }
    }, [childLoaded, setLoadLevel1])

    useEffect(() => {
        setLoadLevel1(true)
        setChildLoaded(false)
    }, [prop.index, setLoadLevel1])

    return (
        <a.div className="main-content" style={fadeChild}>
            {prop.index === 4 ?
                <CameraRoll
                    setChildLoaded={setChildLoaded}
                    openLevel1={prop.openLevel1}
                    openLevel2={prop.openLevel2}
                    setOpenLevel2={setOpenLevel2}
                    openLightBox={prop.openLightBox}
                    setOpenLightBox={setOpenLightBox}
                /> : null}
            {prop.index === 1 ?
                <Things
                    openLevel1={prop.openLevel1}
                /> : null}
        </a.div>
    )
}

export default Content