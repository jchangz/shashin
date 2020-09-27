import {useState, useRef} from 'react';

function useImageLoaded(content) {
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    function imageLoaded() {
        counter.current += 1;
        if (counter.current >= content.length) {
          setLoading(false);
        }
      }
      return {loading, imageLoaded}
}

export default useImageLoaded;