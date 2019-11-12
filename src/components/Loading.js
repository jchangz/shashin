import React, {useState, Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import {useSpring, useTransition, animated} from 'react-spring';

function Loading() {
  
    const [show, state] = useState(true)
    const transitions = useTransition(show, null, { config: { duration: 1000 },
    from: { position: 'absolute', opacity: 0,   background: 'black'},
    enter: { opacity: 1  , background: 'yellow'},
    leave: { opacity: 0,  background: 'black' },
    })

  return(
      console.log("hello", transitions),
      transitions.map(({item, props, key}) => item &&
      
    <animated.div style={props} className="fullpageload"></animated.div>
  )
  )
};

  export default Loading;