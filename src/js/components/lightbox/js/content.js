import React, { useState, useEffect, useRef } from 'react';
import { useSpring, a } from 'react-spring';

function Content({ prop, setIntersecting, content }) {
    const [counter, setCounter] = useState(0);
    const imageRef = useRef([])
    const myLightbox = useRef()
    const touchPosX = useRef(0);
    const touchPosView = useRef(0);
    const touchTime = useRef(0);
    const deviceWidth = window.innerWidth;

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: prop.immediate ? { mass: 1, tension: 270, friction: 30 } : { duration: 1 }
    })
    const { o } = useSpring({
        from: { o: 0 },
        o: Math.abs(((-counter / deviceWidth) - prop.intersecting) * 2.2),
    })

    useEffect(() => {
        if (prop.selected !== null) {
            setCounter(-deviceWidth * prop.selected)
        }
    }, [prop.selected, deviceWidth])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryVal = parseInt(entry.target.classList.value)
                    setIntersecting(entryVal)
                }
            }, { root: null, rootMargin: "0px", threshold: 0.4 }
        );

        imageRef.current.forEach(image => {
            observer.observe(image);
        })

        return () => observer.disconnect();

    }, [setIntersecting]);

    const touchStart = (e) => {
        var touchEventX = e.changedTouches[0].clientX;
        touchTime.current = new Date().getTime();  //Intial touch time to check if swipe
        touchPosView.current = touchEventX;  //Touch position of current viewport
        touchPosX.current = (touchEventX + (deviceWidth * prop.intersecting));  //Touch position of component width
    }

    const touchMove = (e) => {
        var touchEventX = (e.changedTouches[0].clientX - touchPosX.current);
        setCounter(touchEventX);
    }

    const touchEnd = (e) => {
        var touchTiming = (new Date().getTime() - touchTime.current);
        var touchDiff = (touchPosView.current - e.changedTouches[0].clientX);

        if (touchTiming < 250) {
            if (touchDiff > 0) {
                if (prop.intersecting < (content.length - 1)) {
                    setCounter(-deviceWidth * (prop.intersecting + 1));
                }
                else {
                    setCounter(-deviceWidth * prop.intersecting);
                }
            }
            else if (touchDiff < 0) {
                if (prop.intersecting > 0) {
                    setCounter(-deviceWidth * (prop.intersecting - 1));
                }
                else {
                    setCounter(-deviceWidth * prop.intersecting);
                }
            }
        }
        else {
            setCounter(-deviceWidth * prop.intersecting)
        }
    }

    return (
        <a.div className="lightbox-content"
            ref={myLightbox}
            style={scroll}
            onTouchStart={(e) => touchStart(e)}
            onTouchMove={(e) => touchMove(e)}
            onTouchEnd={(e) => touchEnd(e)}>
            {content.map((item, index) => (
                <div className="lightbox-content-img">
                    <img className={index}
                        key={index}
                        ref={ref => imageRef.current[index] = ref}
                        src={item.url} alt="" />
                    <a.img className="lightbox-content-img-blur"
                        style={{ opacity: prop.intersecting === index ? o.interpolate(o => `${o}`) : 1 }}
                        src={item.thumbnail}
                        alt="" />
                </div>
            ))}
        </a.div>
    )
}

export default Content