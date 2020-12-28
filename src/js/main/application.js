import React, { useState, useRef, useEffect } from 'react';
import { useSpring, useSprings, a, config } from 'react-spring';
import { mainroutes } from './images.js'
import Loader from './loader.js';
// import Cover from './cover.js';
import Title from './title.js';
import useObserver from './observer.js';
import useGetImages from './getImages.js';
import useWindowSize from '../hooks/useWindowSize.js';

function Application({ prop, setIndex, setLoadLevel1 }) {
    const myInput = useRef()
    const { loading } = useGetImages()
    const { imageRef, intersectingArray } = useObserver()
    const [width, height] = useWindowSize()
    const [initialLoad, setInitialLoad] = useState(true)
    const [removeLoader, setRemoveLoader] = useState(false)
    const [scalingFactor, setScalingFactor] = useState()
    const [imageTransform, setImageTransform] = useState([])

    useEffect(() => {
        const defaultImage = myInput.current.children[1]
        const documentStyle = document.documentElement.style
        if (height / width > 1.6) {
            setScalingFactor(1.4)
        }
        else {
            setScalingFactor(1.3)
        }
        documentStyle.setProperty('--base',
            window.innerHeight + 'px')
        documentStyle.setProperty('--logo',
            window.innerHeight - (window.innerHeight - defaultImage.clientHeight) / 3 + 'px')
        documentStyle.setProperty('--button',
            (window.innerHeight - defaultImage.clientHeight * scalingFactor) / 4 - 25 + 'px')
    }, [width, height, scalingFactor])

    useEffect(() => {
        if (loading === false) {
            setInitialLoad(false)
            setTimeout(() => {
                setRemoveLoader(true);
            }, 1500)
        }
    }, [loading])

    const selectImage = (e) => {
        var viewport = myInput.current
        var target = e.target
        var targetIndex = parseInt(target.dataset.number)
        var viewTop = (window.innerHeight / 2 - target.offsetHeight / 2) - (target.offsetTop - viewport.scrollTop)
        var viewLeft = (window.innerWidth / 2 - target.offsetWidth / 2) - (target.offsetLeft - viewport.scrollLeft)
        if (prop.index === null) {
            setIndex(targetIndex)
            setImageTransform([viewTop, viewLeft])
            setLoadLevel1(true)
        }
        else { setIndex(null) }
    }

    const mainApp = useSpring({
        opacity: removeLoader ? 1 : 0,
        transform: (prop.openLevel1 ? "translate(0, -50px) scale(0.8)" : "translate(0, 0px) scale(1)"),
        config: config.gentle
    })
    const springs = useSprings(mainroutes.length, mainroutes.map((item, i) => ({
        config: { mass: 1, tension: 200, friction: 20 },
        transform: (prop.index === null) ? "translate(0px, 0px) scale(1)" :
            ((i !== prop.index) ? `translate(0px, 0px) scale(0.5)"}` : `translate(${imageTransform[1]}px, ${imageTransform[0]}px) scale(${scalingFactor})"}`),
        opacity: (prop.index === null) ? 1 : ((i !== prop.index) ? 0 : 1)
    })))

    return (
        <div className="main-app">
            {removeLoader ? null : <Loader prop={{ initialLoad }} />}
            <a.div
                className={"main-app-content" + (prop.index === null ? " active" : "") + (prop.phone ? "" : " tablet")}
                style={mainApp}
                ref={myInput}>
                {springs.map(({ opacity, transform }, i) => (
                    <div className={"shashin " + mainroutes[i].number}
                        onClick={selectImage}
                        ref={ref => imageRef.current[i] = ref}
                        data-number={i}
                        key={i}>
                        <div className="cover-img">
                            <div className="reflow">
                                <a.img className={prop.index === i ? "selected-wc" : ""}
                                    style={{ transform, opacity }}
                                    src={mainroutes[i].img} />
                            </div>
                        </div>
                        {prop.index === null ?
                            <Title isIntersecting={intersectingArray.includes(`${i}`) ? true : null} name={mainroutes[i].title} /> : null}
                    </div>
                ))}
            </a.div>
        </div>
    )
}

export default Application