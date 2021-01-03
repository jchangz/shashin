import React, { useContext } from 'react';
import { useTransition, a } from 'react-spring';
import { ScrollerContext } from "./scrollerContext.js";
import { OpenContext } from "../../../../js/main/context/openContext.js";

function Title() {
    const { stateScroller } = useContext(ScrollerContext);
    const { dispatchOpen } = useContext(OpenContext);

    const transitions = useTransition(stateScroller.title, null, {
        from: { position: 'absolute', transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
        enter: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, },
        leave: { transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
    })

    const selectImage = () => {
        dispatchOpen({ type: 'openLevel2' })
    }

    return (
        <div className="scroller-title">
            {transitions.map(({ item, props, key }) =>
                <a.h2 style={props} key={key}
                    onClick={selectImage}>
                    {item}
                </a.h2>
            )}
        </div>
    )
}

export default Title