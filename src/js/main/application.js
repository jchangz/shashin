import React, { useState, useRef, useEffect } from 'react';
import { useSpring, useSprings, a, config } from 'react-spring';
import { mainroutes } from './images.js'
import smoothscroll from 'smoothscroll-polyfill';
import Loader from './loader.js';

function Application({ prop, setIndex, setLoadLevel1 }) {

    const [initialLoad, setinitalLoad] = useState(true);
    const [initialLoader, setinitialLoader] = useState(true);
    const counter = useRef(0);
    const myInput = useRef() //reference for main container
    const imageRef = useRef([]) //array of image refs for observer
    const [intersecting, setIntersecting] = useState('ni'); //image intersecting status for titles
    const deviceHeight = window.innerHeight;

    useEffect(() => {
        //get device window height to set container height
        document.documentElement.style.setProperty('--base', (deviceHeight + 'px'));
    }, [deviceHeight])

    const imageLoaded = () => {
        //wait for images to onload
        counter.current += 1;

        if (counter.current >= mainroutes.length) {
            smoothscroll.polyfill();

            const defaultImage = myInput.current.children[1];

            setinitalLoad(false)

            //remove svg loader after 1.5s
            setTimeout(() => {
                setinitialLoader(false);
            }, 1500);

            //get distance from bottom to top of image minus 2rem
            document.documentElement.style.setProperty('--logo', deviceHeight - ((deviceHeight - defaultImage.clientHeight) / 3) + 'px');
            document.documentElement.style.setProperty('--button', ((deviceHeight - defaultImage.clientHeight) / 8) + 'px');

            //scroll to default middle image
            myInput.current.scrollTop = defaultImage.offsetTop - ((deviceHeight - defaultImage.clientHeight) / 2);
            myInput.current.scrollLeft = (prop.phone ? defaultImage.offsetLeft - 32 : defaultImage.offsetLeft - 120);
        }
    }

    const selectImage = (i, e) => {
        if (prop.index === null) {
            const clickTarget = e.target
            const clickTargetParent = clickTarget.offsetParent

            //scroll to target image
            setIndex(i)
            //update title for selected image if not being observed
            if (intersecting !== clickTarget.className) {
                setIntersecting(clickTarget.className)
            }

            setLoadLevel1(true)

            myInput.current.scrollTo({
                top: clickTargetParent.offsetTop - ((deviceHeight - clickTargetParent.clientHeight) / 2),
                left: (prop.phone ? clickTargetParent.offsetLeft - 32 : clickTargetParent.offsetLeft - 120),
                behavior: 'smooth'
            })
        }
        else {
            setIndex(null)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && prop.index === null) {
                    setIntersecting(entry.target.className)
                }
            }, { root: null, rootMargin: "0px", threshold: 0.75 }
        );

        if (prop.index === null) {
            imageRef.current.forEach(image => {
                observer.observe(image);
            })
            return () => observer.disconnect();
        }
    }, [prop.index]);

    const mainApp = useSpring({
        opacity: initialLoader ? 0 : (prop.openLevel1 ? 0 : 1),
        transform: (prop.index === null) ? "scale(1)" : "scale(1.25)",
        config: config.gentle
    })
    const springs = useSprings(mainroutes.length, mainroutes.map((item, i) => ({
        config: (prop.index === null) ?
            (intersecting === (item.number) ?
                { mass: 1, tension: 350, friction: 30 } : { mass: 1, tension: 200, friction: 17 }) : { mass: 1, tension: 350, friction: 30 },
        transform: (prop.index === null) ?
            "scale(0.95)" : ((i !== prop.index) ?
                "scale(0.3)" : "scale(0.8)"),
        opacity: intersecting === (item.number) ? 1 : 0
    })))

    return (
        <div className="main-app">
            {initialLoader ? <Loader prop={{ initialLoad }} /> : null}
            <a.div
                className={"main-app-content" + (prop.index === null ? " active" : "") + (prop.phone ? "" : " tablet")}
                ref={myInput}
                style={mainApp}>
                {springs.map(({ transform, opacity }, i) => (
                    <a.div
                        className={"shashin " + mainroutes[i].number}
                        key={i}
                        onClick={(e) => selectImage(i, e)}
                        style={{ transform }}>
                        <img
                            className={mainroutes[i].number}
                            ref={ref => imageRef.current[i] = ref}
                            onLoad={imageLoaded}
                            src={mainroutes[i].url}
                            alt="" />
                        <a.h2 style={{ opacity }}>{mainroutes[i].title}</a.h2>
                    </a.div>
                ))}
            </a.div>
        </div>
    )
}

export default Application