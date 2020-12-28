import { useState, useEffect, useRef } from 'react';

function useObserver() {
    const imageRef = useRef([])
    const [intersectingArray, setIntersectingArray] = useState([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting === true) {
                        var item = entry.target.dataset.number
                        setIntersectingArray(intersectingArray => [...intersectingArray, item])
                    }
                    else if (entry.isIntersecting === false) {
                        setIntersectingArray(intersectingArray => (intersectingArray.filter(item => item !== entry.target.dataset.number)))
                    }
                })
            }, { root: null, rootMargin: "0px", threshold: 0.7 }
        )

        imageRef.current.forEach(image => {
            observer.observe(image);
        })
        return () => observer.disconnect();

    }, []);

    return { imageRef, intersectingArray }
}

export default useObserver;