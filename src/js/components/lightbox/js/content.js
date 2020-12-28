import React, { useEffect, useRef } from 'react';
import { useSpring, a } from 'react-spring';
import useTouchScroller from '../../../hooks/touchScroller.js';

function Content({ prop, setIntersecting, content, closeLightbox, setImageLoaded }) {
    const imageRef = useRef([])
    const myLightbox = useRef()
    const deviceWidth = window.innerWidth
    const { counter, touchStart, touchMove, touchEnd, setCounter } = useTouchScroller(prop, content, -deviceWidth)

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: prop.immediate ? { mass: 1, tension: 270, friction: 30 } : { duration: 1 }
    })

    useEffect(() => {
        if (prop.selectedImage !== null) {
            setCounter(-deviceWidth * prop.selectedImage)
        }
    }, [prop.selectedImage, deviceWidth, setCounter])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryVal = parseInt(entry.target.dataset.intersecting)
                    setIntersecting(entryVal)
                }
            }, { root: null, rootMargin: "0px", threshold: 0.4 }
        );

        imageRef.current.forEach(image => {
            observer.observe(image);
        })

        return () => observer.disconnect();

    }, [setIntersecting])

    return (
        <a.div className="lightbox-content"
            ref={myLightbox}
            style={scroll}
            onTouchStart={(e) => touchStart(e)}
            onTouchMove={(e) => touchMove(e)}
            onTouchEnd={(e) => touchEnd(e)}>
            {content.map((item, i) => (
                <a.div className="lightbox-content-img" key={i}>
                    <div className="lightbox-content-text">
                        <p>Location: {item.location}</p>
                    </div>
                    <div className="lightbox-content-img-blur"
                        data-intersecting={i}
                        ref={ref => imageRef.current[i] = ref}
                        onClick={closeLightbox} />
                    <img className="lightbox-content-img-main"
                        src={prop.intersecting === i && prop.openLightBox ? item.url + "?w=828" : item.url + "?w=200"} alt="" />
                </a.div>
            ))}
        </a.div>
    )
}

export default Content