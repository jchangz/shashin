import React from 'react';
import { useSpring, a } from 'react-spring';
import { ReactComponent as Chevron } from '../../logo.svg';

function Navigation({ prop, setchildchildOpened, setOpened }) {

    const fadeButton = useSpring({
        height: prop.childloading ? "0%" : "100%",
        transform: prop.opened ? 'scale(-1)' : 'scale(1)'
    })

    const clickShowMore = () => {
        if (prop.childchildopened === true) {
            setchildchildOpened(false)
        }
        else {
            prop.opened ? setOpened(false) : setOpened(true)
        }
    }
    return (
        <a.div className={"main-nav" + (prop.childchildopened ? " icon-open" : "")}>
            <a.div className={"navigation-main-chevron" + (prop.opened ? " icon-open" : "")} style={fadeButton}>
                <Chevron onClick={clickShowMore} />
            </a.div>
        </a.div>
    )
}

export default Navigation