import React, { useState } from 'react';
import Application from './main/application.js';
import Header from './main/header.js';
import Content from './main/content.js';
import Navigation from './main/navigation.js';
import './main/main.scss';
import useWindowSize from './hooks/useWindowSize.js';

function Main() {

    const [index, setIndex] = useState(null)
    const [loadLevel1, setLoadLevel1] = useState(true)
    const [openLevel1, setOpenLevel1] = useState(false)
    const [openLevel2, setOpenLevel2] = useState(false)
    const [openLightBox, setOpenLightBox] = useState(false)
    const [width] = useWindowSize()
    const phone = width < 500

    return (
        <div className="main">
            {/* <Header
                prop={{ index, loadLevel1, openLevel1, phone }} /> */}
            <Application
                prop={{ index, openLevel1, phone }}
                setIndex={setIndex}
                setLoadLevel1={setLoadLevel1} />
            <Navigation
                prop={{ loadLevel1, openLevel1, openLevel2, openLightBox }}
                setOpenLevel1={setOpenLevel1}
                setOpenLevel2={setOpenLevel2} />
            <Content
                prop={{ index, openLevel1, openLevel2, openLightBox }}
                setLoadLevel1={setLoadLevel1}
                setOpenLevel2={setOpenLevel2}
                setOpenLightBox={setOpenLightBox} />
        </div>
    );
}

export default Main;