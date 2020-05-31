import React, {useState, useRef, useEffect} from 'react';
import './App.scss';
import {useSprings, useSpring, animated, config} from 'react-spring';
import smoothscroll from 'smoothscroll-polyfill';
import useWindowSize from './hooks/useWindowSize.js';
import CameraRoll from './components/cameraRoll.js';

const items = [
  'https://live.staticflickr.com/65535/48034090387_d62885f35e_c.jpg', 
  'https://live.staticflickr.com/65535/48034089612_d49c757b5b_c.jpg', 
  'https://live.staticflickr.com/65535/48034089942_ebef0ec498_c.jpg',
  'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg',
  'https://live.staticflickr.com/65535/48033979186_8ba9e4dcff_c.jpg',
  'https://live.staticflickr.com/65535/48034021928_1942b50c84_c.jpg',
  'https://live.staticflickr.com/65535/48033051613_949de3e023_c.jpg',
  'https://live.staticflickr.com/65535/48033978851_046672dac7_c.jpg',
  'https://live.staticflickr.com/65535/48034089697_a6f01b151b_c.jpg'
]

const itemss = [
  "ichi", "ni", "san", "shi", "go", "roku", "nana", "hachi", "kyu"
]

const titles = [
  "Camera Roll Kyoto",
  "Trinkets",
  "Cinestill + HK",
  "Japan",
  "Stock Photo Booth",
  "six",
  "seven",
  "eight",
  "nine"
]

function App() {

  //reference for main container
  const myInput = useRef()

  //array of image refs for observer
  const vrefs = []

  //active image status
  const [index, setIndex] = useState(null);

  //intial loader status
  const [initial, setInitial] = useState(true);

  //image preload status
  const counter = useRef(0);
  const [loading, setLoading] = useState(true);

  //image intersecting status for titles
  const [intersecting, setIntersecting] = useState(null);

  //updates for tablet sized devices
  const [width] = useWindowSize();
  const phone = width < 500;

  const deviceHeight = window.innerHeight;

  smoothscroll.polyfill();

  const imageLoaded = () => {

    //wait for images to onload
    counter.current += 1;
    if (counter.current >= items.length) {
      const defaultImage = myInput.current.children[4];
      const defaultState = {
        class: 4,
        title: 'go'
      }

      setInitial(false)

      //get device window height to set container height
      document.documentElement.style.setProperty('--base',(deviceHeight + 'px'));

      //remove svg loader after 1.5s
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      //initial load set image
      setIndex(defaultState.class)
      setIntersecting(defaultState.title)

      //get distance from bottom to top of image minus 2rem
      document.documentElement.style.setProperty('--logo',(deviceHeight - ((deviceHeight - defaultImage.clientHeight) / 2) + 32 + 'px'));

      //scroll to default middle image
      myInput.current.scrollTop = defaultImage.offsetTop - ((deviceHeight - defaultImage.clientHeight) / 2);
      myInput.current.scrollLeft = (phone ? defaultImage.offsetLeft - 32 : defaultImage.offsetLeft - 120);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIntersecting(entry.target.className) }
      },
      { root: null, rootMargin: "0px", threshold: 0.75 }
    );
    for (var i = 0; i < 9; i++) {
      observer.observe(vrefs[i]);
    }
  }, [vrefs]);

  const selectImage = (i, e) => {
    //scroll to target image
    setIndex(i)
    const clickTarget = e.target.offsetParent
    myInput.current.scrollTo({
      top:            clickTarget.offsetTop - ((deviceHeight - clickTarget.clientHeight) / 2),
      left:           (phone ? clickTarget.offsetLeft - 32 : clickTarget.offsetLeft - 120),
      behavior:       'smooth'
    })
  }

  const showImage = () => {
    //show all images
    setIndex(null)
  }

  //showImage animation
  const springs = useSprings(items.length, items.map((item, i) =>({ 
    config: config.gentle,
    opacity: (index === null) | (i === index) ? 1 : 0,
    transform: (index === null)  ? "scale(0.9)" : "scale(1)",
    height: intersecting === (itemss[i]) ? (phone ? 20 : 45) : 0
  })))

  //onload show image animation
  const opacity = useSpring({opacity: loading ? 0 : 1})

  //logo animation
  const logo = useSpring({
    opacity: (index === null) ? 0 : 1,
    width: (index === null) ? 0 : (phone ? 150 : 270)
  })


  return (
  <div>

    <header>
      {/*<div class="progress"></div>*/}
      <animated.div style={logo} className="logo">
          <img alt="" src="http://167.99.106.90/img/shashin.svg"></img>
        </animated.div>
    </header>

    {loading ?
      <div className="svg-wrapper" >
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <rect className={"shape " + (initial === true ? '' : 'loaded' )} height="100%" width="100%" />
        </svg>
      </div>
    :
      ""
    }

    <animated.section
      ref={myInput}
      style={opacity}
      className={"App" + (index === null ? " active" : "") + (phone ? "": " tablet")}
      onClick = {index !== null ? showImage : null }>

      {springs.map(({ height, opacity, transform }, i) => (
        <animated.div
          key={i}
          onClick ={index === null ? (e) => selectImage(i,e) : null }
          className={"shashin " + itemss[i]}
          style={{ opacity, transform }}>
            <img
              ref={ref => vrefs[i] = ref}
              onLoad={imageLoaded}
              className={itemss[i]}
              alt=""
              src={items[i]}>
            </img>
          <animated.h2 style={{ height }}>
            {titles[i]}
          </animated.h2>
        </animated.div>
      ))}     
    </animated.section>
    <div>
     { index === 4 ? <CameraRoll/> : null}
    </div>
  </div>
  );
}

export default App;