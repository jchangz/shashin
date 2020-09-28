import React from 'react';
import { useSprings, a } from 'react-spring';

function Progress({ prop, content }) {
    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: prop.intersecting === i ? 1 : 0.4,
    })))

    return (
        <div className="lightbox-progress-indicator">
            {springs.map(({ opacity }) => (
                <a.span style={{ opacity }}></a.span>
            ))}
        </div>
    )
}

export default Progress