import React, { useContext } from 'react';
import { useSprings, a } from 'react-spring';
import { ScrollerContext } from "./scrollerContext.js";

function Progress() {
    const { stateScroller } = useContext(ScrollerContext);
    const content = stateScroller.route
    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: stateScroller.intersecting === i ? 1 : 0.4,
    })))

    return (
        <a.div className="scroller-progress-indicator">
            {springs.map(({ opacity }, i) => (
                <a.span key={i} style={{ opacity }} />
            ))}
        </a.div>
    )
}

export default Progress