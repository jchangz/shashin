import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import { useSprings, useSpring, animated, config } from 'react-spring';
import smoothscroll from 'smoothscroll-polyfill';
import useWindowSize from './hooks/useWindowSize.js';
import CameraRoll from './content/cameraroll/index.js';
import { ReactComponent as Chevron } from './logo.svg';

const items = [
  'https://live.staticflickr.com/65535/48034090387_d62885f35e_c.jpg',
  'https://live.staticflickr.com/65535/48034089612_d49c757b5b_c.jpg',
  'https://live.staticflickr.com/65535/48034089942_ebef0ec498_c.jpg',
  'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg',
  'https://live.staticflickr.com/65535/50317635388_02895dd76b_o.jpg',
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

function Header({ prop }) {
  const fadeOut = useSpring({ opacity: prop.childloading ? 1 : 0, zIndex: prop.childloading ? 99 : 0 })
  const fadeLogo = useSpring({
    opacity: (prop.index === null || prop.opened) ? 0 : 1,
    width: (prop.index === null) ? 0 : (prop.phone ? 150 : 270),
    transform: prop.opened ? "translateY(-10rem)" : "translateY(0rem)"
  })

  return (
    <header >
      <animated.div style={fadeOut} className="progress"></animated.div>
      <animated.div style={fadeLogo} className="logo">
        <img alt="" src="http://167.99.106.90/img/shashin.svg"></img>
      </animated.div>
    </header>
  )
}

function Loader({ prop }) {
  return (
    <div className="svg-wrapper" >
      <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
        <rect className={"shape " + (prop.initial === true ? '' : 'loaded')} height="100%" width="100%" />
      </svg>
    </div>
  )
}

function App() {

  const myInput = useRef() //reference for main container
  const imageRef = useRef([]) //array of image refs for observer
  const [index, setIndex] = useState(4); //active image status
  const [intersecting, setIntersecting] = useState('go'); //image intersecting status for titles

  //image preload status
  const [initial, setInitial] = useState(true);
  const counter = useRef(0);
  const childcounter = useRef(0);
  const [loading, setLoading] = useState(true);
  const [childloading, setchildLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [childchildopened, setchildchildOpened] = useState(false);

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

      setInitial(false)

      //get device window height to set container height
      document.documentElement.style.setProperty('--base', (deviceHeight + 'px'));

      //remove svg loader after 1.5s
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      //get distance from bottom to top of image minus 2rem
      document.documentElement.style.setProperty('--logo', deviceHeight - ((deviceHeight - defaultImage.clientHeight) / 3) + 'px');
      document.documentElement.style.setProperty('--button', ((deviceHeight - defaultImage.clientHeight) / 8) + 'px');

      //scroll to default middle image
      myInput.current.scrollTop = defaultImage.offsetTop - ((deviceHeight - defaultImage.clientHeight) / 2);
      myInput.current.scrollLeft = (phone ? defaultImage.offsetLeft - 32 : defaultImage.offsetLeft - 120);
    }
  }

  const preloadChild = () => {
    childcounter.current += 1;
    if (childcounter.current >= 4) {
      setchildLoading(false)
      childcounter.current = 0
    }
  }

  const clickShowMore = () => {
    if (childchildopened === true) {
      setchildchildOpened(false)
    }
    else {
      opened ? setOpened(false) : setOpened(true)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && index === null) {
          setIntersecting(entry.target.className)
        }
      }, { root: null, rootMargin: "0px", threshold: 0.75 }
    );

    if (index === null) {
      imageRef.current.forEach(image => {
        observer.observe(image);
      })
      return () => observer.disconnect();
    }
  }, [index]);

  const selectImage = (i, e) => {
    if (index === null) {
      const clickTarget = e.target
      const clickTargetParent = clickTarget.offsetParent

      //scroll to target image
      setIndex(i)
      //update title for selected image if not being observed
      if (intersecting !== clickTarget.className) {
        setIntersecting(clickTarget.className)
      }

      setchildLoading(true)

      myInput.current.scrollTo({
        top: clickTargetParent.offsetTop - ((deviceHeight - clickTargetParent.clientHeight) / 2),
        left: (phone ? clickTargetParent.offsetLeft - 32 : clickTargetParent.offsetLeft - 120),
        behavior: 'smooth'
      })
    }
    else {
      setIndex(null)
    }
  }

  const scaleApp = useSpring({
    opacity: loading ? 0 : 1,
    transform: (index === null) ? "scale(1)" : "scale(1.25)",
    config: config.gentle
  })

  const springs = useSprings(items.length, items.map((item, i) => ({
    config: (index === null) ? (intersecting === (itemss[i]) ? { mass: 1, tension: 350, friction: 30 } : { mass: 1, tension: 200, friction: 17 }) : { mass: 1, tension: 350, friction: 30 },
    transform: (index === null) ? "scale(0.95)" : ((i !== index) ? "scale(0.3)" : "scale(0.8)"),
    
  })))

  const fadeApp = useSpring({ opacity: opened ? 0 : 1, transform: opened ? "translateY(-100%)" : "translateY(0%)" })
  const fadeChild = useSpring({ transform: opened ? 'translateY(-100%)' : 'translateY(10%)' })
  const fadeButton = useSpring({ height: childloading ? "0%" : "100%", transform: opened ? 'scale(-1)' : 'scale(1)' })

  return (
    <div className="hidden">

      <Header prop={{ index, phone, childloading, opened }} />
      {loading ? <Loader prop={{ initial }} /> : null}

      <animated.div style={fadeApp}>
        <animated.div
          className={"App" + (index === null ? " active" : "") + (phone ? "" : " tablet")}
          ref={myInput}
          style={scaleApp}>
          {springs.map(({ transform, opacity }, i) => (
            <animated.div
              className={"shashin " + itemss[i]}
              key={i}
              onClick={(e) => selectImage(i, e)}
              style={{ transform }}>
              <img
                className={itemss[i]}
                ref={ref => imageRef.current[i] = ref}
                onLoad={imageLoaded}
                src={items[i]}
                alt="">
              </img>
         
            </animated.div>
          ))}
        </animated.div>
      </animated.div>

      <animated.div className={"navigation-main" + (childchildopened ? " icon-open" : "")}>
        <animated.div className={"navigation-main-chevron" + (opened ? " icon-open" : "")} style={fadeButton}>
          <Chevron onClick={clickShowMore} />
        </animated.div>
      </animated.div>

      <animated.div className="contentcreate" style={fadeChild} >
        {index === 4 ? <CameraRoll preLoad={preloadChild} childOpen={opened} childchildOpen={setchildchildOpened} /> : null}
      </animated.div>
    </div>
  );
}

export default App;