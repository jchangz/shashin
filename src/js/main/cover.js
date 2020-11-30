import React, { useState } from 'react';
import { useSpring, a } from 'react-spring';

function Cover({ prop }) {
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true)
    }, 10);

    const spring = useSpring({
        opacity: load ? 1 : 0,
    })

    return (
        <a.div className="main-cover" style={spring}>
            <img src={prop.title} alt="" />
        </a.div>
    )
}

export default Cover