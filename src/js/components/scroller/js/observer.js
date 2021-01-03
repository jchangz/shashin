import { useEffect, useRef, useContext } from 'react';
import { ScrollerContext } from "./scrollerContext.js";

function useObserver() {
    const imageRef = useRef([])
    const { dispatchScroller } = useContext(ScrollerContext);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryData = entry.target.dataset
                    dispatchScroller({
                        type: 'setIntersecting',
                        title: entryData.name,
                        intersecting: parseInt(entryData.img),
                    })
                }
            }, { root: null, rootMargin: "0px", threshold: 0.4 }
        );
        imageRef.current.forEach(image => {
            observer.observe(image);
        })
        return () => observer.disconnect();
    }, [dispatchScroller])

    return { imageRef }
}

export default useObserver;