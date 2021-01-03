import React, { useState } from 'react';
import { useSpring, a, config } from 'react-spring';

function Title({ name }) {
    const [load, setLoad] = useState(false);

    setTimeout(() => {
        setLoad(true)
    }, 1);

    const spring = useSpring({
        transform: load ? "scale(1)" : "scale(0)",
        config: config.gentle
    })

    return (
        <a.h2 style={spring}>{name}</a.h2>
    )
}

export default Title