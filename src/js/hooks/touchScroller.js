import { useState, useRef } from 'react';

function useTouchScroller(prop, content, scrollWidth) {

    const [counter, setCounter] = useState(0)
    const touchPosX = useRef(0)
    const touchPosView = useRef(0)
    const touchTime = useRef(0)

    const touchStart = e => {
        var touchEventX = e.changedTouches[0].clientX;
        touchTime.current = new Date().getTime();  //Intial touch time to check if swipe
        touchPosView.current = touchEventX;  //Touch position of current viewport
        touchPosX.current = (touchEventX + (-(scrollWidth) * prop.intersecting));  //Touch position of component width
    }

    const touchMove = e => {
        var touchEventX = (e.changedTouches[0].clientX - touchPosX.current);
        setCounter(touchEventX);
    }

    const touchEnd = e => {
        var touchTiming = (new Date().getTime() - touchTime.current);
        var touchDiff = (touchPosView.current - e.changedTouches[0].clientX);

        if (touchTiming < 250) {
            if (touchDiff > 0) {
                if (prop.intersecting < (content.length - 1)) {
                    setCounter(scrollWidth * (prop.intersecting + 1));
                }
                else {
                    setCounter(scrollWidth * prop.intersecting);
                }
            }
            else if (touchDiff < 0) {
                if (prop.intersecting > 0) {
                    setCounter(scrollWidth * (prop.intersecting - 1));
                }
                else {
                    setCounter(scrollWidth * prop.intersecting);
                }
            }
        }
        else {
            setCounter(scrollWidth * prop.intersecting)
        }
    }

    return { counter, touchStart, touchMove, touchEnd }
}

export default useTouchScroller;