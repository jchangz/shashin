import React, {useState} from 'react';
import { useTrail, a } from 'react-spring';
import useImageLoaded from '../../../hooks/useImageLoaded.js';
import Lightbox from '../../../components/lightbox/index.js';

function Content({ content, setOpenLightBox }) {

    const [selectedImage, setSelectedImage] = useState(null)
    const { loading, imageLoaded } = useImageLoaded(content)
    
    const trail = useTrail(content.length, { opacity: loading ? 0 : 1 })

    const openLightBox = (index) => {
        setSelectedImage(index)
        setOpenLightBox(true)
    }

    return (
        <div className="cr-content">
            <div className="cr-content-grid">
                {trail.map((trail, index) =>
                    <div className="reflow">
                        <img src={content[index].thumbnail} alt="" />
                        <a.img style={trail}
                            onClick={loading ? null : () => openLightBox(index)}
                            onLoad={imageLoaded}
                            src={content[index].url} alt="" />
                    </div>
                )}
            </div>
            <Lightbox
                content={content}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setOpenLightBox={setOpenLightBox}
            />
        </div>
    )
}

export default Content