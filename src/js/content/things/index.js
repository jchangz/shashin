import React, { useState, useRef } from 'react';
import Hiroshima from './js/pageHiroshima.js'
import Mosaic from './js/pageMosaic.js'
import './things.scss';

const Things = ({ preloadContent, setPreloadLength }) => {
    const [scrollLeft, setScrollLeft] = useState(0)
    const [loadNext, setloadNext] = useState(null)
    const [imageLoaded, setimageLoaded] = useState(null)

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