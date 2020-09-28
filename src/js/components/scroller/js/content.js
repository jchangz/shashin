import React, { useState, useEffect, useRef } from 'react';
import { useSpring, a } from 'react-spring';

function Content({ prop, onLoad, content, setIntersecting, setIntersectingName }) {
    const [counter, setCounter] = useState(0);
    const imageRef = useRef([])
    const touchPosX = useRef(0);
    const touchPosView = useRef(0);
    const touchTime = useRef(0);

    const scroll = useSpring({
        transform: counter ? `translate3d(${counter}px,-50%,0)` : `translate3d(${counter}px,-50%,0)`,
        config: { mass: 1, tension: 270, friction: 30 }
    })
    const { o } = useSpring({
        from: { o: 0 },
        o: Math.abs(((-counter / prop.deviceWidth) - prop.intersecting) * 2.2)
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

    }, [setIntersecting, setIntersectingName]);

    const fadeIn = useSpring({
        opacity: prop.imgopen ? 1 : 0,
        config: { mass: 1, tension: 270, friction: 30 }
    })

    const touchStart = (e) => {
        var touchEventX = e.changedTouches[0].clientX;
        touchTime.current = new Date().getTime();  //Intial touch time to check if swipe
        touchPosView.current = touchEventX;  //Touch position of current viewport
        touchPosX.current = (touchEventX + (prop.deviceWidth * prop.intersecting));  //Touch position of component width
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
                    setCounter(-prop.deviceWidth * (prop.intersecting + 1));
                }
                else {
                    setCounter(-prop.deviceWidth * prop.intersecting);
                }
            }
            else if (touchDiff < 0) {
                if (prop.intersecting > 0) {
                    setCounter(-prop.deviceWidth * (prop.intersecting - 1));
                }
                else {
                    setCounter(-prop.deviceWidth * prop.intersecting);
                }
            }
        }
        else {
            setCounter(-prop.deviceWidth * prop.intersecting)
        }
    }

    return (
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
                        src={item.url} alt="" />
                    <a.img className="scroller-content-blur"
                        style={fadeIn}
                        src={item.blur} alt="" />
                    <a.img className="scroller-content-blur"
                        style={{ opacity: prop.intersecting === i ? o.interpolate(o => `${o}`) : 1 }}
                        src={item.blur} alt="" />
                </div>
            ))}
        </a.div>
    )
}

export default Content