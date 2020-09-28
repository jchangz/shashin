import React, { useRef } from 'react';
import { useSpring, a } from 'react-spring';
import CameraRoll from '../content/cameraroll/index.js';

function Content({ prop, setOpenLevel2, setLoadLevel1 }) {

    const fadeChild = useSpring({ transform: prop.openLevel1 ? 'translateY(-100%)' : 'translateY(10%)' })

    const childcounter = useRef(0);

    const preloadChild = () => {
        childcounter.current += 1;
        if (childcounter.current >= 4) {
            setLoadLevel1(false)
            childcounter.current = 0
        }
    }

    return (
        <a.div className="main-content" style={fadeChild}>
            {prop.index === 4 ?
                <CameraRoll
                    preLoad={preloadChild}
                    childOpen={prop.openLevel1}
                    childchildOpen={setOpenLevel2}
                /> : null
            }
        </a.div>
    )
}

export default Content