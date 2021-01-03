import React, { useContext } from 'react';
import { useSpring, a } from 'react-spring';
import { ScrollerProvider } from '../components/scroller/js/scrollerContext.js';
import CameraRoll from '../content/cameraroll/index.js';
import Things from '../content/things/index.js';
import { IndexContext } from "./context/indexContext.js";
import { OpenContext } from "./context/openContext.js";

function Content() {
    const { stateIndex } = useContext(IndexContext);
    const { stateOpen } = useContext(OpenContext);

    const fadeChild = useSpring({
        transform: stateOpen.openLevel1 ? 'translateY(-100%)' : 'translateY(0%)',
        delay: (stateOpen.openLevel1 === true) ? 0 : 250,
        immediate: true
    })

    return (
        <a.div className="main-content" style={fadeChild}>
            {stateIndex.index === 4 ?
                <ScrollerProvider>
                    <CameraRoll />
                </ScrollerProvider> : null}
            {stateIndex.index === 1 ?
                <Things /> : null}
        </a.div>
    )
}

export default Content