import React, { useRef } from 'react';
import { useSpring, a } from 'react-spring';
import CameraRoll from '../content/cameraroll/index.js';

function Content({ prop, childchildOpen, setchildLoading }) {

    const fadeChild = useSpring({ transform: prop.opened ? 'translateY(-100%)' : 'translateY(10%)' })

    const childcounter = useRef(0);

    const preloadChild = () => {
        childcounter.current += 1;
        if (childcounter.current >= 4) {
            setchildLoading(false)
            childcounter.current = 0
        }
    }

    return (
        <a.div className="main-content" style={fadeChild}>
            {prop.index === 4 ?
                <CameraRoll
                    preLoad={preloadChild}
                    childOpen={prop.opened}
                    childchildOpen={childchildOpen}
                /> : null
            }
        </a.div>
    )
}

export default Content