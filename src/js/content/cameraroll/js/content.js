import React, { useEffect, useState } from 'react';
import { useSpring, a } from 'react-spring';
import Lightbox from '../../../components/lightbox/index.js';
import Grid from './grid.js';

function Content({ content, title, openLightBox, setOpenLightBox }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [ready, setReady] = useState(null)

    useEffect(() => {
        setReady(true)
    }, [])

    const opacity = useSpring({ opacity: ready ? 1 : 0 })

    return (
        <a.div className="cr-content" style={opacity}>
            <h2 className="cr-content-title">{title}</h2>
            <Grid
                prop={{ ready, selectedImage }}
                content={content}
                setOpenLightBox={setOpenLightBox}
                openLightBox={openLightBox}
                setSelectedImage={setSelectedImage}
            />
            <Lightbox
                content={content}
                openLightBox={openLightBox}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setOpenLightBox={setOpenLightBox}
            />
        </a.div>
    )
}

export default Content