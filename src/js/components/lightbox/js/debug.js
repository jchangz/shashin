import React from 'react';
import { useSpring, a } from 'react-spring';

function Debug({ prop }) {

    const { o } = useSpring({
        from: { o: 0 },
        o: (prop.intersecting + 1)
    })
    return (
        <div>
            <span>Intersecting: </span>
            <a.span>{o.interpolate(n => n.toFixed(0))}</a.span>
        </div>
    )
}

export default Debug