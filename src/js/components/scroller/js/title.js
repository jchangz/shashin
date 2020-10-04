import React from 'react';
import { useTransition, a } from 'react-spring';

function Title({ prop, fadeOut, selectImage }) {

    const transitions = useTransition(prop.intersectingName, null, {
        from: { position: 'absolute', transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
        enter: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, },
        leave: { transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
    })

    return (
        <a.div className="scroller-title" style={fadeOut}>
            {transitions.map(({ item, props, key }) =>
                <a.h2 style={props} key={key}
                    data-click={prop.selectImageData}
                    onClick={selectImage}>
                    {item}
                </a.h2>
            )}
        </a.div>
    )
}

export default Title