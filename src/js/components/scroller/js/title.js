import React from 'react';
import { useTransition, a } from 'react-spring';

function Title({ prop, content, click, fadeOut }) {

    const transitions = useTransition(prop.intersectingName, null, {
        from: { position: 'absolute', transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
        enter: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, },
        leave: { transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
    })

    return (
        <a.div className="scroller-title" style={fadeOut}>
            {transitions.map(({ item, props, key }) =>
                <a.h2 style={props}
                    data-click={(prop.intersecting !== null) ? content[prop.intersecting].click : null}
                    onClick={click}
                    key={key}
                >
                    {item}
                </a.h2>
            )}
        </a.div>
    )
}

export default Title