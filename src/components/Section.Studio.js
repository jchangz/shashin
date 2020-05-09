import React, {useState, useRef, useEffect} from 'react';
import '../App.css';
import {useSprings, useSpring, useTransition, animated, config} from 'react-spring';
import smoothscroll from 'smoothscroll-polyfill';
import useWindowSize from '../hooks/useWindowSize.js';

const items = [
  'https://live.staticflickr.com/65535/48135300432_4ef5c106de_b.jpg', 
  'https://live.staticflickr.com/65535/48420919721_783b7335be_k.jpg', 
  'https://live.staticflickr.com/65535/48165937296_8e7afc1769_b.jpg',
  'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg',
  'https://live.staticflickr.com/65535/48135206926_8d5ea89d81_c.jpg',
  'https://live.staticflickr.com/65535/48034021928_1942b50c84_c.jpg',
  'https://live.staticflickr.com/65535/48048046752_7200f5604c_c.jpg',
  'https://live.staticflickr.com/65535/48047965856_74dff9e275_c.jpg',
  'https://live.staticflickr.com/65535/48034089697_a6f01b151b_c.jpg'
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

  const myInput = useRef()

  const vrefs = []

  const [Name, setName] = useState(null)

  const [index, setIndex] = useState(null);

  const [initial, setInitial] = useState(true);

  const [loading, setLoading] = useState(true);

  const counter = useRef(0);

  const [width] = useWindowSize();

  const phone = width < 500;

  smoothscroll.polyfill();

  const imageLoaded = () => {

    counter.current += 1;

    document.documentElement.style.setProperty('--base',(window.innerHeight + 'px'));

    if (counter.current >= items.length) {

      setInitial(false)

      setTimeout(() => {
        setLoading(false);
      }, 1500);

      setIndex(0)

      if (phone) {
        myInput.current.scrollTo({
          top:            0,
          left:           80,
        })
      }
      else {
        myInput.current.scrollTo({
          top:            0,
          left:           120,
        })
      }
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
  }, [vrefs]);

  const clicked = (i, e) => {
    setIndex(i)
    if (phone) {
      myInput.current.scrollTo({
        top:            e.target.offsetParent.offsetTop -86,
        left:           e.target.offsetParent.offsetLeft - 32,
        behavior:       'smooth'
      })
    }
    else{
      myInput.current.scrollTo({
        top:            e.target.offsetParent.offsetTop -86,
        left:           e.target.offsetParent.offsetLeft - 120,
        behavior:       'smooth'
      })
    }
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

  const opacity = useSpring({opacity: loading ? 0 : 1})

  return (

  <div>

    {loading ?
      <div className="svg-wrapper" >
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <rect className={"shape " + (initial === true ? '' : 'loaded' )} height="100%" width="100%" />
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

    <animated.div
      ref={myInput}
      style={opacity}
      className={"App mobile " + (index === null ? 'mob' : 'hdie') + (phone ? "": " tablet")}
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
              alt=""
              src={items[i]}>
            </img>
        </animated.div>
      ))}     
    </animated.div>
  </div>
  );
}

export default Studio;