import React, {useState, useRef, useEffect} from 'react';
import '../App.css';
import {useSprings, useSpring, useTransition, animated, config} from 'react-spring';
import { useInView } from 'react-intersection-observer';
import smoothscroll from 'smoothscroll-polyfill';

const items = [
  'https://live.staticflickr.com/65535/48135300432_4ef5c106de_b.jpg', 
  'https://live.staticflickr.com/65535/48420919721_783b7335be_k.jpg', 
  'https://live.staticflickr.com/65535/48165937296_8e7afc1769_b.jpg',
  'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg',
  'https://live.staticflickr.com/65535/48135206926_8d5ea89d81_c.jpg',
  'https://live.staticflickr.com/65535/48034021928_1942b50c84_c.jpg'
]

const itemss = [
    "one"
  , "two"
  , "three"
  , "four"
  , "five"
  , "six"
]

const Studio = ()=> {

  const myInput = React.useRef()
  const ref = useRef()
  const vrefs = []
  const [inViewRef, inView, entry] = useInView()

  const [Name, setName] = useState(null)

  const [index, setIndex] = useState(null);

  const [loading, setLoading] = useState(true);

  const counter = useRef(0);

  smoothscroll.polyfill();

  const imageLoaded = () => {
    console.log(loading)
    counter.current += 1;
    if (counter.current >= items.length) {
      setLoading(false);
      setIndex(0)
      myInput.current.scrollTo({
        top:            0,
        left:           80,
      })
      document.documentElement.style.setProperty('--base', (window.innerHeight - 64 + 'px'));
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setName(entry.target.className)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.75
      }
    );
    for (var i = 0; i < 6; i++) {
      observer.observe(vrefs[i]);
    }
  }, [ref]);

  const clicked = (i, e) => {
    setIndex(i)

    myInput.current.scrollTo({
      top:            e.target.offsetParent.offsetTop -86,
      left:           e.target.offsetParent.offsetLeft - 32,
      behavior:       'smooth'
    })
  }

  const clicked2 = () => {
    setIndex(null)
  }

  const transitions = useTransition(Name, null, {
    config: config.wobbly,
    from: { position: 'absolute', height: 0, overflow: 'hidden', opacity: 0},
    enter: { height: 34, opacity: 1},
    leave: { height: 0, opacity: 0 },
  })

  const springs = useSprings(items.length, items.map((item, i) =>
    ({ 
      opacity: (index === null) | (i === index) ? 1 : 0,
      transform: (index === null)  ? "scale(0.9)" : "scale(1)"
    })
  ))

  return (

  <div>

    {loading ?
      <div class="svg-wrapper">
        <svg height="400" width="320" xmlns="http://www.w3.org/2000/svg">
          <rect class="shape" height="400" width="320" />
        </svg>
      </div>
    :
      ""
    }

    <div className="testcont">
      {transitions.map(({ item, props, key }) =>
        <animated.h2 className="testinkid" key={key} style={props}>{item}</animated.h2>
      )}
    </div>

    <div
      ref={myInput}
      style={{opacity: loading ? 0 : 1}}
      className={"App mobile " + (index === null ? 'mob' : 'hdie')}
      onClick = {index !== null ? clicked2 : null }>

      {springs.map(({ x, height,opacity, transform, ...rest }, i) => (
        <animated.div
          key={i}
          onClick ={index === null ? (e) => clicked(i,e) : null }
          className={"japanp reflow2 " + itemss[i]}
          style={{ opacity, transform }}>
            <img
              ref={ref => vrefs[i] = ref}
              onLoad={imageLoaded}
              className={"imghun " + itemss[i]}
              src={items[i]}>
            </img>
        </animated.div>
      ))}     
    </div>
  </div>
  );
}

export default Studio;