import React, { useState, useEffect, useRef, } from 'react';
import { useSpring, useSprings, a } from 'react-spring';
import './scroller.scss';

function Scroller({ content, onLoad, animation, open, click }) {
    const deviceWidth = window.innerWidth;

    const imageRef = useRef([])

    const touchPosX = useRef(0);
    const touchPosView = useRef(0);
    const touchTime = useRef(0);

    const [counter, setCounter] = useState(0);
    const [intersecting, setIntersecting] = useState(null);

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: { mass: 1, tension: 270, friction: 30 }
    })

    const openAnimation = useSpring({ transform: open ? 'scale(1)' : animation === "explode" ? 'scale(1.5)' : 'scale(1)' })

    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: intersecting === i ? 1 : 0
    })))

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryVal = parseInt(entry.target.dataset.img)
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

    return (
        <a.div className="scroller" style={openAnimation}>
            <a.div className="scroller-container"
                style={scroll}
                onTouchStart={(e) => touchStart(e)}
                onTouchMove={(e) => touchMove(e)}
                onTouchEnd={(e) => touchEnd(e)}>
                {springs.map(({ opacity }, i) => (
                    <div className={"scroller-content " + content[i].class} key={i}>
                        <a.img
                            data-click={content[i].click}
                            data-img={i}
                            onLoad={onLoad}
                            onClick={click}
                            ref={ref => imageRef.current[i] = ref}
                            src={content[i].url} alt=""
                        />
                        <a.div className="scroller-title" style={{ opacity }}>
                            <h2>
                                {content[i].title}
                                <span>{content[i].subtitle}</span>
                            </h2>
                        </a.div>
                    </div>
                ))}
            </a.div>
            <span className="scroller-progress-indicator">{intersecting + 1}/{content.length}</span>
        </a.div>
    )
}

export default Scroller;