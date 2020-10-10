import React, { useState } from 'react';
import { useTrail, a } from 'react-spring';
import useImageLoaded from '../../../hooks/useImageLoaded.js';
import Lightbox from '../../../components/lightbox/index.js';

function Content({ content, openLightBox, setOpenLightBox }) {

    const [selectedImage, setSelectedImage] = useState(null)
    const { loading, imageLoaded } = useImageLoaded(content)

    const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })

    const openLightbox = (index) => {
        setSelectedImage(index)
        setOpenLightBox(true)
    }

    return (
        <div className="cr-content">
            <div className="cr-content-grid">
                {trail.map((trail, index) =>
                    <div className="reflow">
                        <img className="reflow-preview"
                            src={content[index].url + "?w=50&blur=50"} alt="" />
                        <a.img style={trail}
                            onClick={loading ? null : () => openLightbox(index)}
                            onLoad={imageLoaded}
                            src={content[index].url + "?w=200"} alt="" />
                    </div>
                )}
            </div>
            <Lightbox
                content={content}
                openLightBox={openLightBox}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setOpenLightBox={setOpenLightBox}
            />
        </div>
    )
}

export default Content