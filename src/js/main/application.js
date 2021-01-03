import React, { useState, useRef, useEffect, useContext } from 'react';
import { useSpring, useSprings, a, config } from 'react-spring';
import { mainroutes } from './images.js'
import Loader from './loader.js';
// import Cover from './cover.js';
import Title from './title.js';
import useObserver from './observer.js';
import useGetImages from './getImages.js';
import useWindowSize from '../hooks/useWindowSize.js';
import { IndexContext } from "./context/indexContext.js";
import { LoadingContext } from "./context/loadingContext.js";
import { OpenContext } from "./context/openContext.js";

function Application() {
    const myInput = useRef()
    const scalingFactor = useRef()
    const imageTransform = useRef([])
    const { loading } = useGetImages()
    const { imageRef, intersectingArray } = useObserver()
    const { stateIndex, dispatchIndex } = useContext(IndexContext);
    const { dispatchLoading } = useContext(LoadingContext);
    const { stateOpen } = useContext(OpenContext);
    const [width, height] = useWindowSize()
    const [initialLoad, setInitialLoad] = useState(true)
    const [removeLoader, setRemoveLoader] = useState(false)

    useEffect(() => {
        const defaultImage = myInput.current.children[1]
        const documentStyle = document.documentElement.style
        if (height / width > 1.6) {
            scalingFactor.current = 1.4
        }
        else {
            scalingFactor.current = 1.3
        }
        documentStyle.setProperty('--base',
            window.innerHeight + 'px')
        documentStyle.setProperty('--logo',
            window.innerHeight - (window.innerHeight - defaultImage.clientHeight) / 3 + 'px')
        documentStyle.setProperty('--button',
            (window.innerHeight - defaultImage.clientHeight * scalingFactor.current) / 4 - 25 + 'px')
    }, [width, height])

    useEffect(() => {
        if (loading === false) {
            setInitialLoad(false)
            setTimeout(() => {
                setRemoveLoader(true);
            }, 1)
        }
    }, [loading])

    const selectImage = (e) => {
        e.stopPropagation();
        var viewport = myInput.current
        var target = e.target
        var targetIndex = parseInt(target.dataset.number)
        var viewTop = (window.innerHeight / 2 - target.offsetHeight / 2) - (target.offsetTop - viewport.scrollTop)
        var viewLeft = (window.innerWidth / 2 - target.offsetWidth / 2) - (target.offsetLeft - viewport.scrollLeft)
        if (stateIndex.index === null) {
            imageTransform.current = [viewTop, viewLeft]
            dispatchIndex({
                type: 'setIndex',
                index: targetIndex
            })
        }
        else {
            dispatchIndex({ type: 'clearIndex' })
            dispatchLoading({ type: 'reset' })
        }
    }

    const mainApp = useSpring({
        opacity: removeLoader ? 1 : 0,
        transform: (stateOpen.openLevel1 ? "translate(0, -50px) scale(0.8)" : "translate(0, 0px) scale(1)"),
        config: config.gentle
    })
    const springs = useSprings(mainroutes.length, mainroutes.map((item, i) => ({
        config: { mass: 1, tension: 200, friction: 20 },
        transform: (stateIndex.index === null) ? "translate(0px, 0px) scale(1)" :
            ((i !== stateIndex.index) ? `translate(0px, 0px) scale(0.5)"}` :
                `translate(${imageTransform.current[1]}px, ${imageTransform.current[0]}px) scale(${scalingFactor.current})"}`),
        opacity: (stateIndex.index === null) ? 1 : ((i !== stateIndex.index) ? 0 : 1)
    })))

    return (
        <div className="main-app">
            {removeLoader ? null : <Loader prop={{ initialLoad }} />}
            <a.div
                className={"main-app-content" + (stateIndex.index === null ? " active" : "")}
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
                                <a.img className={stateIndex.index === i ? "selected-wc" : ""}
                                    style={{ transform, opacity }}
                                    src={mainroutes[i].img} />
                            </div>
                        </div>
                        {stateIndex.index === null && intersectingArray.includes(`${i}`) ?
                            <Title name={mainroutes[i].title} /> : null
                        }
                    </div>
                ))}
            </a.div>
        </div>
    )
}

export default Application