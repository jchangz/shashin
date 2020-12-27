import React, { useState, useEffect, useRef } from 'react';
import { a, useSpring, useSprings } from 'react-spring';
import useImageLoaded from '../../../hooks/useImageLoaded.js';

function Grid({ prop, content, setOpenLightBox, setSelectedImage, openLightBox }) {
    const myInput = useRef()
    const { loading } = useImageLoaded(content, "?w=200")
    const [removePlaceholder, setRemovePlaceholder] = useState(null)
    const [imageTransform, setImageTransform] = useState([])

    const selectLightboxImage = (e) => {
        var viewTop = (myInput.current.offsetHeight / 2) - (e.target.offsetTop) - ((e.target.offsetHeight) / 2)
        var viewLeft = ((window.innerWidth / 2) - (e.target.offsetWidth / 2)) - (e.target.offsetLeft)
        var targetIndex = parseInt(e.target.dataset.number);
        setSelectedImage(targetIndex)
        setOpenLightBox(true)
        setImageTransform([viewTop, viewLeft])
    }

    const scale = useSpring({
        transform: prop.ready ? "scale(1)" : "scale(0.6)",
        opacity: prop.ready ? 1 : 0
    })
    const springs = useSprings(content.length, content.map((item, i) => ({
        config: { mass: 1, tension: 400, friction: 30 },
        transform: (prop.selectedImage === null) ? "translate(0px, 0px) scale(1)" :
            ((i !== prop.selectedImage) ? `translate(0px, 0px) scale(0.5)"}` : `translate(${imageTransform[1]}px, ${imageTransform[0]}px) scale(2.8)"}`),
        opacity: loading ? 0 : ((prop.selectedImage === null) ? 1 : ((i !== prop.selectedImage) ? 0 : 1))
    })))

    useEffect(() => {
        if (openLightBox !== true) {
            setSelectedImage(null)
        }
    }, [openLightBox, setSelectedImage])

    useEffect(() => {
        if (loading === false) {
            setTimeout(() => {
                setRemovePlaceholder(true)
            }, 200);
        }
    }, [loading])

    return (
        <a.div className="cr-content-grid"
            style={scale}
            ref={myInput}>
            {removePlaceholder ? null :
                <div class="cr-content-grid-placeholder">
                    <div className="cr-content-grid">
                        {content.map((item, i) => (
                            <div class="reflow" key={i}>
                                <img className="reflow-preview"
                                    src={item.url + "?w=50&blur=50"} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            }
            {springs.map(({ opacity, transform }, i) => (
                <a.div className="reflow"
                    data-number={i}
                    key={i}
                    style={{ opacity, transform }}
                    onClick={selectLightboxImage}>
                    <img src={content[i].url + "?w=200"} alt="" />
                </a.div>
            ))}
        </a.div>
    )
}

export default Grid