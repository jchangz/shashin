import React from 'react';
import { useSpring, a } from 'react-spring';

function Header({ prop }) {

    const fadeOut = useSpring({
        opacity: prop.loadLevel1 ? 1 : 0,
        zIndex: prop.loadLevel1 ? 99 : 0
    })

    const fadeLogo = useSpring({
        opacity: (prop.index === null || prop.openLevel1) ? 0 : 1,
        width: (prop.index === null) ? 0 : (prop.phone ? 150 : 270),
        transform: prop.openLevel1 ? "translateY(-10rem)" : "translateY(0rem)"
    })

    return (
        <header>
            <a.div style={fadeOut} className="progress"></a.div>
            <a.div style={fadeLogo} className="logo">
                <img alt="" src="http://167.99.106.90/img/shashin.svg"></img>
            </a.div>
        </header>
    )
}

export default Header