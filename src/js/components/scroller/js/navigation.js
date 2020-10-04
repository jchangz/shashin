import React from 'react';
import { useSpring, a } from 'react-spring';
import { ReactComponent as Chevron } from '../../../../logo.svg';

function Navigation({ prop, selectImage }) {

    const fadeUp = useSpring({
        opacity: prop.openLevel1 ? (prop.openLevel2 ? 0 : 1) : 1,
        transform: prop.openLevel1 ? "translate3d(-50%,-50%,0)" : "translate3d(-50%, 250%, 0)",
        config: { mass: 1, tension: 100, friction: 12 }
    })

    return (
        <a.div className="scroller-nav"
            style={fadeUp}
            data-click={prop.selectImageData}
            onClick={selectImage} >
            <Chevron />
        </a.div>
    )
}

export default Navigation