import React, { useState } from 'react';
import { useSpring, a } from 'react-spring';

function Title({ name, selected }) {
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true)
    }, 10);

    const spring = useSpring({
        opacity: load ? (selected !== null ? 0 : 1) : 0,
    })

    return (
        <a.h2 style={spring} className="main-title">{name}</a.h2>
    )
}

export default Title