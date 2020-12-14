import React, { useState, useRef, useEffect } from 'react';
import { useSpring, useSprings, a, config } from 'react-spring';
import { mainroutes } from './images.js'
import Loader from './loader.js';
import Cover from './cover.js';
import Title from './title.js';
import imgPromise from '../hooks/imagePromise.js';

function Application({ prop, setIndex, setLoadLevel1 }) {

    const [initialLoad, setinitalLoad] = useState(true)
    const [initialLoader, setinitialLoader] = useState(true)
    const myInput = useRef() //reference for main container
    const imageRef = useRef([]) //array of image refs for observer
    const [intersectingArray, setIntersectingArray] = useState([])
    const [imageTransform, setImageTransform] = useState([])

    useEffect(() => {
        //get device window height to set container height
        document.documentElement.style.setProperty('--base', (window.innerHeight + 'px'));
        const defaultImage = myInput.current.children[1];
        //get distance from bottom to top of image minus 2rem
        document.documentElement.style.setProperty('--logo', window.innerHeight - ((window.innerHeight - defaultImage.clientHeight) / 3) + 'px');
        document.documentElement.style.setProperty('--button', ((window.innerHeight - defaultImage.clientHeight) / 8) + 'px');

        const coverImages = mainroutes.reduce(function (result, item) {
            if (item.cover.img) {
                result.push(item.cover.img)
            }
            return result
        }, [])

        const promiseArray = [
            mainroutes.map(item => item.img), coverImages].reduce(function (arr, item) {
                return arr.concat(item)
            }, [])

        Promise.all(promiseArray.map(item => imgPromise(item))).then(result => {
            setinitalLoad(false)
            //remove svg loader after 1.5s
            setTimeout(() => {
                setinitialLoader(false);
            }, 1500);
        })

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting === true) {
                        var item = entry.target.dataset.number
                        setIntersectingArray(intersectingArray => [...intersectingArray, item])
                    }
                    else if (entry.isIntersecting === false) {
                        setIntersectingArray(intersectingArray => (intersectingArray.filter(item => item !== entry.target.dataset.number)))
                    }
                })
            }, { root: null, rootMargin: "0px", threshold: 0.7 }
        )

        imageRef.current.forEach(image => {
            observer.observe(image);
        })
        return () => observer.disconnect();
    }, [])

    const selectImage = e => {
        var viewTop = ((window.innerHeight / 2) - (e.target.offsetHeight / 2)) - (e.target.offsetTop - myInput.current.scrollTop)
        var viewLeft = ((window.innerWidth / 2) - (e.target.offsetWidth / 2)) - (e.target.offsetLeft - myInput.current.scrollLeft)
        var targetIndex = e.target.dataset.number;

        if (prop.index === null) {
            setIndex(`${targetIndex}`)
            setImageTransform([viewTop, viewLeft])
            setLoadLevel1(true)
        }
        else { setIndex(null) }
    }

    const mainApp = useSpring({
        opacity: initialLoader ? 0 : (prop.openLevel1 ? 0 : 1),
        config: config.gentle
    })

    const springs = useSprings(mainroutes.length, mainroutes.map((item, i) => ({
        config: { mass: 1, tension: 200, friction: 20 },
        transform: (prop.index === null) ? "translate(0px, 0px) scale(1)" :
            ((`${i}` !== prop.index) ? `translate(0px, 0px) scale(0.5)"}` : `translate(${imageTransform[1]}px, ${imageTransform[0]}px) scale(1.7)"}`),
        opacity: (prop.index === null) ? 1 : ((`${i}` !== prop.index) ? 0 : 1)
    })))

    return (
        <div className="main-app">
            {initialLoader ? <Loader prop={{ initialLoad }} /> : null}
            <a.div
                className={"main-app-content" + (prop.index === null ? " active" : "") + (prop.phone ? "" : " tablet")}
                style={mainApp}
                ref={myInput}>
                {springs.map(({ opacity, transform }, i) => (
                    <a.div
                        className={"shashin " + mainroutes[i].number}
                        onClick={selectImage}
                        ref={ref => imageRef.current[i] = ref}
                        data-number={[i]}
                        key={i}>
                        <div className="cover-img">
                            <div class="reflow">
                                <a.img className={prop.index === `${i}` ? " selected" : ""} style={{ transform, opacity }} src={mainroutes[i].img} />
                            </div>
                        </div>
                        {prop.index === null ?
                            <Title isIntersecting={intersectingArray.includes(`${i}`) ? true : null} name={mainroutes[i].title} /> : null}
                    </a.div>
                ))}
            </a.div>
        </div>
    )
}

export default Application