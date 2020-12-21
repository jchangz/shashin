import React, { useEffect, useState } from 'react';
import { useSpring, useTrail, a } from 'react-spring';
import useImageLoaded from '../../../hooks/useImageLoaded.js';
import Lightbox from '../../../components/lightbox/index.js';
import Grid from './grid.js';

function Content({ content, openLightBox, setOpenLightBox }) {

    const [selectedImage, setSelectedImage] = useState(null)
    const { loading, imageLoaded } = useImageLoaded(content)
    const [ready, setReady] = useState(null)

    useEffect(() => {
        setReady(true)
    }, [])

    const trail = useTrail(content.length, {
        transform: loading ? "scale(0)" : "scale(1)",
        config: { mass: 1, tension: 400, friction: 30 }
    })
    const opacity = useSpring({ opacity: ready ? 1 : 0 })
    const scale = useSpring({ transform: ready ? "scale(1)" : "scale(0.6)" })

    return (
        <a.div className="cr-content" style={opacity}>
            <a.div className="cr-content-grid" style={scale}>
                {trail.map((trail, index) =>
                    <Grid
                        content={content}
                        index={index}
                        trail={trail}
                        setOpenLightBox={setOpenLightBox}
                        imageLoaded={imageLoaded}
                        setSelectedImage={setSelectedImage} />
                )}
            </a.div>
            <Lightbox
                content={content}
                openLightBox={openLightBox}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setOpenLightBox={setOpenLightBox}
                metadata="true"
            />
        </a.div>
    )
}

export default Content