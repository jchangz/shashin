import React, { useRef, useState, useEffect } from 'react';
import { useSpring, a } from 'react-spring';
import { hiroshimaText, hiroshimaContent } from '../js/images.js'
import useImageObserver from '../js/observer.js'
import Loading from '../js/loading.js'
import '../things.scss';

function Hiroshima({ prop, setloadNext, setimageLoaded }) {
    const imageRef = useRef([])
    const counter = useRef(0);

    const { intersecting, thingwidth } = useImageObserver(imageRef)
    const [loadedFlag, setLoadedFlag] = useState(false)
    const [showImage, setshowImages] = useState(false)

    const { o, b, } = useSpring({
        from: { o: 0, b: 0 },
        o: prop.scrollLeft - thingwidth > 0 ? prop.scrollLeft - thingwidth + 100 : 0,
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
        <div className={"th-container" + (showImage ? "" : " hide")} >
            {hiroshimaContent.map((item, i) => (
                <div className={"th-content " + item.name} ref={ref => imageRef.current[i] = ref}>
                    {item.name !== "h-postcard" ?
                        loadedFlag ? <a.img src={item.img} alt="" onLoad={loadImage} /> : null
                        : null}
                    {item.name === "h-purikura" ?
                        <div className="hiroshima">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 373 95.91">
                                <a.path className="st0 svht" stroke="#283574" style={{ strokeDashoffset: intersecting === "th-content h-purikura" ? b.interpolate(b => `${b}`) : null }}
                                    d={hiroshimaText.welcomeTo} />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.84 121.99">
                                <a.path className="st0 svht" stroke="#e55145" style={{ strokeDashoffset: intersecting === "th-content h-purikura" ? b.interpolate(b => `${b}`) : null }}
                                    d={hiroshimaText.hiroshima} />
                            </svg>
                        </div>
                        : null}
                    {item.name === "h-peacememorial" ?
                        <a.div style={{ width: intersecting === "th-content h-peacememorial" ? o.interpolate(o => `${o}px`) : null }} >
                            {loadedFlag ? <img src={item.img[1]} alt="" onLoad={loadImage} /> : null}
                        </a.div>
                        : null}
                    {item.name === "h-postcard" ?
                        <div className="th-content">
                            {item.img.map((item, i) => (
                                <div className="th-sticky">
                                    <div className="th-sticky-content">
                                        {loadedFlag ?
                                            <img src={item} alt="" onLoad={loadImage} />
                                            : null}
                                    </div>
                                </div>
                            ))}
                            <div className="th-loading">
                                <Loading prop={{ showImage }} />
                            </div>
                        </div>
                        : null}
                </div>
            ))}
        </div>
    )
}

export default Hiroshima