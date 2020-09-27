import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useSprings, a } from 'react-spring';
import './lightbox.scss';

function Lightbox({ content, selected, setClose }) {
    const deviceWidth = window.innerWidth;

    const myLightbox = useRef()
    const imageRef = useRef([])

    const touchPosX = useRef(0);
    const touchPosView = useRef(0);
    const touchTime = useRef(0);

    const [counter, setCounter] = useState(0);
    const [show, setShow] = useState(null)
    const [intersecting, setIntersecting] = useState(null);
    const [immediate, setImmediate] = useState(null); //prevent translate animation on initial click

    const { o } = useSpring({
        from: { o: 0, h: 0 },
        o: Math.abs(((-counter / deviceWidth) - intersecting) * 2.2),
        // h: (intersecting + 1),
    })
    const open = useSpring({
        transform: show ? 'translateY(0)' : 'translateY(100%)'
    })
    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: immediate ? { mass: 1, tension: 270, friction: 30 } : { duration: 1 }
    })
    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: intersecting === i ? 1 : 0.4,
    })))

    useEffect(() => {
        if (selected !== null) {
            setCounter(-deviceWidth * selected)
            setShow(true)
            setIntersecting(selected)
            setTimeout(() => {
                setImmediate(true)
            }, 275);
        }
    }, [selected, deviceWidth])

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

    }, []);

    const touchStart = (e) => {
        var touchEventX = e.changedTouches[0].clientX;
        touchTime.current = new Date().getTime();  //Intial touch time to check if swipe
        touchPosView.current = touchEventX;  //Touch position of current viewport
        touchPosX.current = (touchEventX + (deviceWidth * intersecting));  //Touch position of component width
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
                if (intersecting < (content.length - 1)) {
                    setCounter(-deviceWidth * (intersecting + 1));
                }
                else {
                    setCounter(-deviceWidth * intersecting);
                }
            }
            else if (touchDiff < 0) {
                if (intersecting > 0) {
                    setCounter(-deviceWidth * (intersecting - 1));
                }
                else {
                    setCounter(-deviceWidth * intersecting);
                }
            }
        }
        else {
            setCounter(-deviceWidth * intersecting)
        }
    }

    const closeLightbox = () => {
        setShow(null)
        setClose(null)
        setImmediate(null)
    }

    return (
        <a.div style={open} className="lightbox">
            {/* <div>
                <span>Intersecting: </span>
                <a.span>{h.interpolate(n => n.toFixed(0))}</a.span>
            </div> */}

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
                            style={{ opacity: intersecting === index ? o.interpolate(o => `${o}`) : 1 }}
                            src={item.thumbnail}
                            alt="" />
                    </div>
                ))}
            </a.div>

            <div className="lightbox-close" onClick={closeLightbox} />

            <div className="lightbox-progress-indicator">
                {springs.map(({ opacity }, i) => (
                    <a.span style={{ opacity }}></a.span>
                ))}
            </div>
        </a.div>
    )
}

export default Lightbox;