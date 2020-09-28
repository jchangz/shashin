import React from 'react';
import { useSpring, a } from 'react-spring';
import { iconclose } from '../../../main/images.js';

function Close({ prop, returnHome }) {
    const fadeButton = useSpring({
        height: prop.open ? 50 : 0,
        transform: (prop.hide === null) ?
            'translate3d(-50%,0%,0)' : 'translate3d(-50%,200%,0)'
    })

    return (
        <a.div className="button btn-close fxd white"
            style={fadeButton}
            onClick={returnHome}>
            <img src={iconclose} alt="" />
        </a.div>
    )
}

export default Close