import { useState, useEffect, useRef } from 'react';

function useImageObserver() {
    const imageRef = useRef([])
    const [intersecting, setIntersecting] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(entry.target.className)
                }
            }, { root: null, rootMargin: "0px", threshold: 0.75 }
        );

        imageRef.current.forEach(image => {
            observer.observe(image);
        })

        return () => observer.disconnect();

    }, []);

    return { imageRef, intersecting }
}

export default useImageObserver;