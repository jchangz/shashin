import React, { useState, useEffect, useRef } from 'react';
import { useSpring, a } from 'react-spring';
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

    const open = useSpring({
        height: show ? '100%' : '0%',
    })
    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: immediate ? { mass: 1, tension: 270, friction: 30 } : { duration: 1 }
    })
    const fill = useSpring({ transform: show ? `scaleX(${(intersecting + 1) / content.length})` : 'scaleX(0)' })

    useEffect(() => {
        if (selected !== null) {
            setCounter(-deviceWidth * selected)
            setShow(true)
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
            <a.div className="lightbox-content"
                ref={myLightbox}
                style={scroll}
                onTouchStart={(e) => touchStart(e)}
                onTouchMove={(e) => touchMove(e)}
                onTouchEnd={(e) => touchEnd(e)}>
                {content.map((item, index) => (
                    <a.img className={index}
                        key={index}
                        ref={ref => imageRef.current[index] = ref}
                        src={item.url} alt="" />
                ))}
            </a.div>
            <div className="lightbox-close" onClick={closeLightbox}>
                <div className="lightbox-progress">
                <a.div className="lightbox-progress-indicator" style={fill} />
                </div>
            </div>
        </a.div>
    )
}

export default Lightbox;