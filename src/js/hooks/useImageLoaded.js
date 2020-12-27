import { useState, useEffect } from 'react';

function useImageLoaded(content, size) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imgPromise = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.addEventListener('error', (err) => reject(err));
        img.src = url + size;
      });
    }

    const promiseArray = [
      content.map(item => item.url)].reduce(function (arr, item) {
        return arr.concat(item)
      }, [])

    Promise.all(promiseArray.map(item => imgPromise(item))).then(result => {
      setLoading(false);
    })
  }, [content, size])

  return { loading }
}

export default useImageLoaded;