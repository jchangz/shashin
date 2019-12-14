import React, {useState, Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import {useSpring, useTrail, animated} from 'react-spring';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import {Spring} from 'react-spring/renderprops';
import useWindowSize from '../hooks/useWindowSize.js';

const items = ['Japan', 'Latest', 'Studio', 'Nostalgia', 'Travel'];
const config = { mass: 5, tension: 2000, friction: 200 };
const routes = ['', '/Latest', '/Studio'];


function Navigation() {
  const [width, height] = useWindowSize();
  const [state, toggle] = useState(true)
  const props = useSpring({opacity: state ? 1: 0, transform: state ? "translateY(0px)": "translateY(15%)"})
  const propss = useSpring({transform: state ? "translateX(-100%)": "translateX(0)"})
  const propsss = useSpring({transform: state ? "translateX(-100%)": "translateX(0)"})
  const porps = ({display: (width > 769) ? "none": ""})
  const ooo = ({display: (width < 769) ? "none": "block"})
  const trail = useTrail(items.length, {
    config,
    delay: 250,
    opacity: state ? 0 : 1,
    x: state ? 0 : 0,
    width: state ? 0 : 200,
    from: { opacity: 1, x: 0, width: 200 },

  });

  return(
  <header>
    <nav>
      <div style={ooo}>
      <animated.div ><h1>Hello</h1></animated.div>
      </div>
    
    <div style={porps}>
    <animated.div style={propss} className="headerpage">

      {trail.map(({ x, width, ...rest }, index) => ( <animated.li key={items[index]} className={"navbuttons " + items[index]} style=
      {{ ...rest, transform: x.interpolate(x => `translate3d(0,0,0)`) }}>
        <animated.div style={{ width }}>
        <Link onClick={() => toggle(!state)} to={routes[index]}>{items[index]}</Link>
        </animated.div>
        </animated.li>))}
    
        <animated.div style={propsss} onClick={() => toggle(!state)} className="headerpageDesktop">
          <div className="header-japan"></div>
          <div className="header-latest"></div>
          <div className="header-studio"></div>

        </animated.div>
      </animated.div>
      
      <button className="btn" onClick={() => toggle(!state)}>
	<div class="hamburger-1"></div>
	<animated.div style={props} className="hamburger-2" ></animated.div>
	<div class="hamburger-3"></div>
  <div class="hamburger-4"></div>
    </button>
    </div>
    </nav>

    
  </header>
  )
  };

export default Navigation;