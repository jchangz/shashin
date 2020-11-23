import React, { useEffect, useRef, useState } from 'react';
import { useSpring, a } from 'react-spring';
import { mosaicContent } from '../js/images.js'
import useImageObserver from '../js/observer.js'
import Loading from '../js/loading.js'
import '../things.scss';

function Mosaic({ prop, imageLoaded, setloadNext, setimageLoaded }) {
    const imageRef = useRef([])
    const { intersecting, thingwidth } = useImageObserver(imageRef)
    const [nextSectionLoaded, setnextSectionLoaded] = useState(false)
    const [loadedImageFlag, setloadedImageFlag] = useState(false)
    const title = "hiroshima"

    const { o, b, } = useSpring({
        from: { o: 0, b: 0 },
        o: 1 - ((prop.scrollLeft - thingwidth) / 600),
        b: 500 - (prop.scrollLeft - thingwidth) / 2,
        immediate: true,
    })

    useEffect(() => {
        if (intersecting === "th-loading" && nextSectionLoaded === false) {
            setloadNext(true)
            setnextSectionLoaded(true)
        }
    }, [intersecting, setloadNext, nextSectionLoaded])

    useEffect(() => {
        if (prop.imageLoaded === true && loadedImageFlag === false) {
            setloadedImageFlag(true)
            setimageLoaded(false)
        }
    }, [setloadedImageFlag, prop.imageLoaded, loadedImageFlag, setimageLoaded])
    return (
        <div className="th-container" >
            {mosaicContent.map((item, i) => (
                <div className={"th-content " + item.name} >
                    {item.name === "m-family" ?
                        <div className="th-content" style={{ width: 800 }}>
                            {item.img.map((item, i) => (
                                <div className="th-sticky">
                                    <div className="th-sticky-content">
                                        <img src={item} alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        : null}
                </div>
            ))}
        </div>
    )
}

export default Mosaic