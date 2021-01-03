import React, { useContext } from 'react';
import { useSpring, a } from 'react-spring';
import { ReactComponent as Chevron } from '../../../../logo.svg';
import { OpenContext } from "../../../../js/main/context/openContext.js";

function Navigation() {
    const { stateOpen, dispatchOpen } = useContext(OpenContext);

    const selectImage2 = () => {
        dispatchOpen({ type: 'openLevel2' })
    }
    const fadeUp = useSpring({
        opacity: stateOpen.openLevel1 ? (stateOpen.openLevel2 ? 0 : 1) : 1,
        transform: stateOpen.openLevel1 ? "translate3d(-50%,-50%,0)" : "translate3d(-50%, 250%, 0)",
        config: { mass: 1, tension: 100, friction: 12 },
    })

    return (
        <a.div className="scroller-nav"
            style={fadeUp}
            onClick={selectImage2} >
            <Chevron />
        </a.div>
    )
}

export default Navigation