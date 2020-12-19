import React, { useEffect, useState } from 'react';
import { useSpring, a, config } from 'react-spring';
import Title from './js/title.js';
import Content from './js/content.js';
import Navigation from './js/navigation.js';
import Progress from './js/progress.js';
import './scroller.scss';

function Scroller({ content, preloadContent, openLevel1, selectImage, openLevel2 }) {

    const deviceWidth = window.innerWidth
    const [intersecting, setIntersecting] = useState(null)
    const [intersectingName, setIntersectingName] = useState(null)
    const [selectImageData, setSelectImageData] = useState(null)

    const spring = useSpring({
        opacity: openLevel2 ? 0 : (openLevel1 ? 1 : 0),
        transform: openLevel2 ? "scale(0.8)" : (openLevel1 ? 'scale(1)' : 'scale(1.5)'),
        config: config.gentle
    })

    useEffect(() => {
        if (intersecting !== null) {
            setSelectImageData(content[intersecting].click)
        }
    }, [intersecting, content])

    return (
        <a.div className="scroller" style={spring}>
            <Content
                content={content}
                prop={{ intersecting, deviceWidth, openLevel1, openLevel2 }}
                preloadContent={preloadContent}
                setIntersecting={setIntersecting}
                setIntersectingName={setIntersectingName} />
            <Navigation
                prop={{ openLevel1, openLevel2, selectImageData }}
                selectImage={selectImage} />
            <Title
                prop={{ intersectingName, intersecting, selectImageData }}
                selectImage={selectImage} />
            <Progress
                content={content}
                prop={{ intersecting }} />
        </a.div>
    )
}

export default Scroller;