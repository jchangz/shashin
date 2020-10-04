import React, { useEffect, useState } from 'react';
import { useSpring, a } from 'react-spring';
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

    const scaleUp = useSpring({
        transform: openLevel1 ? 'scale(1)' : 'scale(1.5)'
    })
    const fadeOut = useSpring({
        opacity: openLevel2 ? 0 : 1
    })

    useEffect(() => {
        if (intersecting !== null) {
            setSelectImageData(content[intersecting].click)
        }
    }, [intersecting, content])

    return (
        <a.div className="scroller" style={scaleUp}>
            <Content
                content={content}
                prop={{ intersecting, deviceWidth, openLevel2 }}
                preloadContent={preloadContent}
                setIntersecting={setIntersecting}
                setIntersectingName={setIntersectingName} />
            <Navigation
                prop={{ openLevel1, openLevel2, selectImageData }}
                selectImage={selectImage} />
            <Title
                prop={{ intersectingName, intersecting, selectImageData }}
                selectImage={selectImage}
                fadeOut={fadeOut} />
            <Progress
                content={content}
                prop={{ intersecting }}
                fadeOut={fadeOut} />
        </a.div>
    )
}

export default Scroller;