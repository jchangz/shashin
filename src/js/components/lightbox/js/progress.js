import React, { useContext } from 'react';
import { useSprings, a } from 'react-spring';
import { LightboxContext } from "./lightboxContext.js";

function Progress({ content }) {
    const { stateLightbox } = useContext(LightboxContext);

    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: stateLightbox.intersecting === i ? 1 : 0.4,
    })))

    return (
        <div className="lightbox-progress-indicator">
            {springs.map(({ opacity }, i) => (
                <a.span style={{ opacity }}
                    key={i} />
            ))}
        </div>
    )
}

export default Progress