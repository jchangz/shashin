import React, { useState } from 'react';
import { useSpring, a } from 'react-spring';

function Title({ name, isIntersecting }) {
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true)
    }, 10);

    const spring = useSpring({
        opacity: load ? (isIntersecting === true ? 1 : 0) : 0,
    })

    return (
        <a.h2 style={spring} className="main-title">{name}</a.h2>
    )
}

export default Title