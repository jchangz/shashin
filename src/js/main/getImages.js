import { useState, useEffect } from 'react';
import { mainroutes } from './images.js'
import imgPromise from '../hooks/imagePromise.js';

function useGetImages() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const coverImages = mainroutes.reduce(function (result, item) {
            if (item.cover.img) {
                result.push(item.cover.img)
            }
            return result
        }, [])

        const promiseArray = [mainroutes.map(item => item.img), coverImages].reduce(function (arr, item) {
            return arr.concat(item)
        }, [])

        Promise.all(promiseArray.map(item => imgPromise(item))).then(result => {
            setLoading(false)
        })
    }, [])

    return { loading }
}

export default useGetImages;