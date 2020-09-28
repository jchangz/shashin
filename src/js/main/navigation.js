import React from 'react';
import { useSpring, a } from 'react-spring';
import { ReactComponent as Chevron } from '../../logo.svg';

function Navigation({ prop, setOpenLevel1, setOpenLevel2 }) {

    const fadeButton = useSpring({
        height: prop.loadLevel1 ? "0%" : "100%",
        transform: prop.openLevel1 ? 'scale(-1)' : 'scale(1)'
    })

    const clickShowMore = () => {
        if (prop.openLevel2 === true) {
            setOpenLevel2(false)
        }
        else {
            prop.openLevel1 ? setOpenLevel1(false) : setOpenLevel1(true)
        }
    }
    return (
        <a.div className={"main-nav" + (prop.openLevel2 ? " icon-open" : "")}>
            <a.div className={"navigation-main-chevron" + (prop.openLevel1 ? " icon-open" : "")} style={fadeButton}>
                <Chevron onClick={clickShowMore} />
            </a.div>
        </a.div>
    )
}

export default Navigation