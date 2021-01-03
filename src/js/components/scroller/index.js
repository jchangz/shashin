import React, { useContext } from 'react';
import { useTransition, a, config } from 'react-spring';
import Title from './js/title.js';
import Content from './js/content.js';
import Navigation from './js/navigation.js';
import Progress from './js/progress.js';
import { OpenContext } from "../../main/context/openContext.js";
import './scroller.scss';

function Scroller({ name }) {
    const { stateOpen } = useContext(OpenContext);

    const transitions = useTransition(stateOpen.openLevel1, null, {
        from: { opacity: 0, transform: 'scale(1.5)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(1.5)' },
        config: config.gentle
    })

    return (
        <div className={name}>
            {transitions.map(({ item, key, props }) => item ?
                <a.div className="scroller"
                    style={props}
                    key={key}>
                    <Content />
                    <Navigation />
                    <Title />
                    <Progress />
                </a.div>
                : null
            )}
        </div>
    )
}

export default Scroller;