import React, { useContext } from 'react';
import { useSpring, a } from 'react-spring';
import { LoadingContext } from "./context/loadingContext.js";
import { OpenContext } from "./context/openContext.js";
import { ReactComponent as Chevron } from '../../logo.svg';

function Navigation() {
    const { stateLoading } = useContext(LoadingContext);
    const { stateOpen, dispatchOpen } = useContext(OpenContext);

    const spring = useSpring({
        opacity: stateOpen.lightbox ? 0 : 1,
        height: stateLoading.loaded ? "100%" : "0%",
        transform: stateOpen.openLevel1 ?
            (stateOpen.openLevel2 ? 'scale(-1) rotate(90deg)' : 'scale(-1) rotate(0deg)') : 'scale(1) rotate(0deg)'
    })

    const openLevels = () => {
        if (stateOpen.openLevel2 === true) {
            dispatchOpen({ type: 'closeLevel2' })
        }
        else {
            stateOpen.openLevel1 ? dispatchOpen({ type: 'closeOpenLevel1' }) :
                dispatchOpen({ type: 'setOpenLevel1' })
        }
    }

    return (
        <a.div className={"main-nav" + (stateOpen.lightbox ? " icon-open" : "")}>
            <a.div className={"navigation-main-chevron" + (stateOpen.openLevel1 ? " icon-open" : "")}
                style={spring}>
                <Chevron onClick={openLevels} />
            </a.div>
        </a.div>
    )
}

export default Navigation