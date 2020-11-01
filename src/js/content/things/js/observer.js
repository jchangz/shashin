import { useState, useEffect } from 'react';

function useImageObserver(imageRef) {

    const [intersecting, setIntersecting] = useState(null);
    const [thingwidth, setThingWidth] = useState(0);
    const deviceWidth = window.innerWidth - 1

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(entry.target.className)
                    setThingWidth(entry.target.offsetLeft)
                }
            }, { root: null, rootMargin: `0% -90% 0% 0%`, threshold: 0 }
        );

        imageRef.current.forEach(image => {
            observer.observe(image);
        })

        return () => observer.disconnect();

    }, [deviceWidth, imageRef]);

    return { intersecting, thingwidth }
}

export default useImageObserver;