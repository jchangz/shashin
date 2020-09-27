import React, { useState, useEffect, useRef, } from 'react';
import { useSpring, useSprings, useTransition, a } from 'react-spring';
import { ReactComponent as Chevron } from '../../../logo.svg';
import './scroller.scss';

function Scroller({ content, onLoad, animation, open, click, imgopen }) {
    const deviceWidth = window.innerWidth;

    const imageRef = useRef([])

    const touchPosX = useRef(0);
    const touchPosView = useRef(0);
    const touchTime = useRef(0);

    const [counter, setCounter] = useState(0);
    const [intersecting, setIntersecting] = useState(null);
    const [intersectingName, setIntersectingName] = useState(null);

    const fadeUp = useSpring({
        opacity: open ? (imgopen ? 0 : 1) : 1,
        transform: open ? "translate3d(-50%,-50%,0)" : "translate3d(-50%, 250%, 0)",
        config: { mass: 1, tension: 100, friction: 12 }
    })
    const fadeOut = useSpring({
        opacity: imgopen ? 0 : 1
    })
    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: { mass: 1, tension: 270, friction: 30 }
    })
    const fadeIn = useSpring({
        opacity: imgopen ? 1 : 0,
        config: { mass: 1, tension: 270, friction: 30 }
    })
    const openAnimation = useSpring({
        transform: open ? 'scale(1)' : animation === "explode" ? 'scale(1.5)' : 'scale(1)'
    })
    const transitions = useTransition(intersectingName, null, {
        from: { position: 'absolute', transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
        enter: { transform: 'translate3d(0,0,0) scale(1)', opacity: 1, },
        leave: { transform: 'translate3d(0,10%,0) scale(0)', opacity: 0, },
    })
    const springs = useSprings(content.length, content.map((item, i) => ({
        opacity: intersecting === i ? 1 : 0.4,
    })))
    const { o } = useSpring({
        from: { o: 0 },
        o: Math.abs(((-counter / deviceWidth) - intersecting) * 2.2)
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryData = entry.target.dataset
                    setIntersecting(parseInt(entryData.img))
                    setIntersectingName(entryData.name)
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
                {content.map((item, i) => (
                    <div className={"scroller-content " + item.class} key={i}>
                        <a.img
                            data-name={item.subtitle}
                            data-img={i}
                            onLoad={onLoad}
                            ref={ref => imageRef.current[i] = ref}
                            src={item.url} alt=""
                        />
                        <a.img style={fadeIn} className="scroller-content-blur" src={item.blur}></a.img>
                        <a.img src={item.blur} className="scroller-content-blur"
                            style={{ opacity: intersecting === i ? o.interpolate(o => `${o}`) : 1 }}>
                        </a.img>
                    </div>
                ))}
            </a.div>

            {/* <a.div className="scroller-title">
                <h2>
                    {content[0].title}
                    {transitions.map(({ item, props, key }) =>
                        <a.span key={key} style={props}>{item}</a.span>
                    )}
                </h2>
            </a.div> */}

            <a.div className="scroller-nav"
                data-click={(intersecting !== null) ? content[intersecting].click : null}
                onClick={click}
                style={fadeUp}>
                <Chevron />
            </a.div>

            <a.div className="scroller-title" style={fadeOut}>
                {transitions.map(({ item, props, key }) =>
                    <a.h2 data-click={(intersecting !== null) ? content[intersecting].click : null}
                        onClick={click} key={key} style={props}>{item}</a.h2>
                )}
            </a.div>

            <a.div className="scroller-progress-indicator" style={fadeOut}>
                {springs.map(({ opacity }, i) => (
                    <a.span style={{ opacity }}></a.span>
                ))}
            </a.div>

            {/* {imgopen ? null :
                <div className="scroller-progress-block">
                    {springs.map(({ opacity }, i) => (
                        <a.span style={{ opacity }}>{content[i].subtitle}</a.span>
                    ))}
                </div>
            } */}

            {/* <span className={"scroller-progress " + intersecting}>{intersecting + 1} of {content.length}</span> */}
        </a.div>
    )
}

export default Scroller;