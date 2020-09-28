import React from 'react';
import { useSpring, a } from 'react-spring';
import { ReactComponent as Chevron } from '../../../../logo.svg';

function Navigation({ prop, content, click }) {

    const fadeUp = useSpring({
        opacity: prop.open ? (prop.imgopen ? 0 : 1) : 1,
        transform: prop.open ? "translate3d(-50%,-50%,0)" : "translate3d(-50%, 250%, 0)",
        config: { mass: 1, tension: 100, friction: 12 }
    })

    return (
        <a.div className="scroller-nav"
            data-click={(prop.intersecting !== null) ? content[prop.intersecting].click : null}
            onClick={click}
            style={fadeUp}>
            <Chevron />
        </a.div>
    )
}

export default Navigation