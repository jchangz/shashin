import React, { useState } from 'react';
import { useSpring, a } from 'react-spring';
import Title from './js/title.js';
import Content from './js/content.js';
import Navigation from './js/navigation.js';
import Progress from './js/progress.js';
import './scroller.scss';

function Scroller({ content, onLoad, animation, open, click, imgopen }) {
    const deviceWidth = window.innerWidth;
    const [intersecting, setIntersecting] = useState(null);
    const [intersectingName, setIntersectingName] = useState(null);

    const fadeOut = useSpring({
        opacity: imgopen ? 0 : 1
    })
    const scaleUp = useSpring({
        transform: open ? 'scale(1)' : animation === "explode" ? 'scale(1.5)' : 'scale(1)'
    })

    return (
        <a.div className="scroller" style={scaleUp}>

            <Content
                prop={{ intersecting, deviceWidth, imgopen }}
                content={content}
                onLoad={onLoad}
                setIntersecting={setIntersecting}
                setIntersectingName={setIntersectingName}
            />

            <Navigation
                prop={{ intersecting, open, imgopen }}
                content={content}
                click={click}
            />

            <Title
                prop={{ intersectingName, intersecting }}
                content={content}
                click={click}
                fadeOut={fadeOut}
            />

            <Progress
                prop={{ intersecting }}
                content={content}
                fadeOut={fadeOut}
            />

        </a.div>
    )
}

export default Scroller;