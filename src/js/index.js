import React, { useState } from 'react';
import Application from './main/application.js'
import Header from './main/header.js'
import Loader from './main/loader.js'
import Content from './main/content.js'
import Navigation from './main/navigation.js'
import './main/main.scss';
import useWindowSize from './hooks/useWindowSize.js';

function Main() {

    const [index, setIndex] = useState(4);
    const [initial, setInitial] = useState(true);
    const [loading, setLoading] = useState(true);
    const [childloading, setchildLoading] = useState(true);
    const [opened, setOpened] = useState(false);
    const [childchildopened, setchildchildOpened] = useState(false);

    //updates for tablet sized devices
    const [width] = useWindowSize();
    const phone = width < 500;

    return (
        <div className="main">

            <Header
                prop={{ index, phone, childloading, opened }}
            />

            <Loader
                prop={{ initial, loading }}
            />

            <Application
                setIndex={setIndex}
                setInitial={setInitial}
                setLoading={setLoading}
                setchildLoading={setchildLoading}
                prop={{ index, phone, loading, opened }}
            />

            <Navigation
                setchildchildOpened={setchildchildOpened}
                setOpened={setOpened}
                prop={{ opened, childloading, childchildopened }}
            />

            <Content
                childchildOpen={setchildchildOpened}
                setchildLoading={setchildLoading}
                prop={{ opened, index }}
            />
        </div>
    );
}

export default Main;