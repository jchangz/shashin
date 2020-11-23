import React, { useState, useRef } from 'react';
import Hiroshima from './js/pageHiroshima.js'
import Mosaic from './js/pageMosaic.js'
import HiroshimaLoad from './js/hiroshima/load.js'
import HiroshimaPage from './js/hiroshima/page.js'
import useImageObserver from './js/observer.js'
import './things.scss';

const Things = ({ preloadContent, setPreloadLength }) => {
    const [scrollLeft, setScrollLeft] = useState(0)
    const [loadNext, setloadNext] = useState(null)
    const [imageLoaded, setimageLoaded] = useState(null)
    const imageRef = useRef([])
    const { intersecting, thingwidth } = useImageObserver(imageRef)

    const touchMove = (e) => {
        setScrollLeft(e.target.scrollLeft);
    }

    return (
        <div className="things" onScroll={(e) => touchMove(e)} >
            <Mosaic
                setimageLoaded={setimageLoaded}
                setloadNext={setloadNext}
                prop={{ scrollLeft, loadNext, imageLoaded }}
            />
            <HiroshimaLoad
                prop={{ imageRef, intersecting, thingwidth, scrollLeft }}
            />
            <HiroshimaPage
                prop={{ imageRef, intersecting, thingwidth, scrollLeft }}
            />
            <Hiroshima
                setimageLoaded={setimageLoaded}
                setloadNext={setloadNext}
                prop={{ scrollLeft, loadNext, imageLoaded }}
            />
            <img style={{ display: 'none' }} className="things1" src="https://live.staticflickr.com/65535/50500064131_416c16a2ba_o.jpg" onLoad={preloadContent} alt="" />
        </div>
    )
}

export default Things;