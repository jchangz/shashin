import React, { useRef, useState, useEffect } from 'react';
import { useSpring, a } from 'react-spring';
import { hiroshimaText, hiroshimaContent } from '../../js/images.js'
import useImageObserver from '../../js/observer.js'
import Loading from '../../js/loading.js'
import '../../things.scss';

function HiroshimaPage({ prop, setloadNext, setimageLoaded }) {
    const imageRef = useRef([])
    const counter = useRef(0);

    const { intersecting, thingwidth } = useImageObserver(imageRef)
    const [loadedFlag, setLoadedFlag] = useState(false)
    const [showImage, setshowImages] = useState(false)

    const { o, b, } = useSpring({
        from: { o: 0, b: 0 },
        o: prop.scrollLeft - prop.thingwidth > 0 ? prop.scrollLeft - prop.thingwidth - (2 * window.innerWidth) + 200 : 0,
        b: prop.scrollLeft >= 0 && prop.scrollLeft <= 200 ? 400 - (prop.scrollLeft * 1.5) : 0,
        immediate: true,
    })

    const count = hiroshimaContent.map((item) => {
        return item.img.length
    })

    const loadImage = () => {
        counter.current += 1;
        if (counter.current >= count.reduce(function (a, b) { return a + b })) {
            setimageLoaded(true)
            setloadNext(false)
            setshowImages(true)
        }
    }

    useEffect(() => {
        if (prop.loadNext === true && loadedFlag === false) {
            setLoadedFlag(true)
        }
    }, [loadedFlag, prop.loadNext])

    return (
        <div className="th-container th-loading sticky-test" style={{ zIndex: 0 }}>
            <div className="th-content h-peacememorial sticky-test-2">
                <a.img className="intersecting-test" src="https://live.staticflickr.com/65535/50500064131_416c16a2ba_o.jpg" ref={ref => prop.imageRef.current[1] = ref} alt="" />
                <a.div style={{ width: prop.intersecting === "intersecting-test" ? o.interpolate(o => `${o}px`) : null }} >
                    <img src="https://live.staticflickr.com/65535/50500219802_47b6789c3a_o.jpg" alt="" />
                </a.div>
            </div>
        </div>
    )
}

export default HiroshimaPage