import React from 'react';
import { useSprings, a } from 'react-spring';

function Progress({ prop, content, fadeOut }) {

    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: prop.intersecting === i ? 1 : 0.4,
    })))
    return (
        <a.div className="scroller-progress-indicator"
            style={fadeOut}>
            {springs.map(({ opacity }) => (
                <a.span style={{ opacity }} />
            ))}
        </a.div>
    )
}

export default Progress