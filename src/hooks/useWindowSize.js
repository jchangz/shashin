import {useState, useLayoutEffect} from 'react';
import throttle from 'lodash/throttle';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize',  throttle(updateSize, 250, {leading: true}));
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default useWindowSize;