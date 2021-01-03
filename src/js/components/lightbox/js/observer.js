import { useEffect, useRef, useContext } from 'react';
import { LightboxContext } from "./lightboxContext.js";

function useObserver() {
    const imageRef = useRef([])
    const { dispatchLightbox } = useContext(LightboxContext);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    var entryVal = parseInt(entry.target.dataset.intersecting)
                    dispatchLightbox({
                        type: 'setIntersecting',
                        intersecting: entryVal
                    })
                }
            }, { root: null, rootMargin: "0px", threshold: 0.4 }
        );
        imageRef.current.forEach(image => {
            observer.observe(image);
        })
        return () => observer.disconnect();
    }, [dispatchLightbox])

    return { imageRef }
}

export default useObserver;