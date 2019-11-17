import React, { useState, useEffect, useRef } from "react";
import {useSpring, useTransition, animated} from 'react-spring';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
const Hooksnav = () => {
   

   let [prevscrollY, setPos] = useState(window.pageYOffset)
   const [visible, setVisible] = useState(true)
    
   const props = useSpring({opacity: visible? 1 : 0 })
 
   useEffect(()=> {
    const handleScroll = () => { 
        let currentscrollY = window.pageYOffset;
        
       setVisible(prevscrollY > currentscrollY);
      
        setPos(currentscrollY);
        
        console.log(prevscrollY, currentscrollY, visible);
     
     
     };
      

      window.addEventListener("scroll", throttle(handleScroll, 250));
      return () => 
         window.removeEventListener("scroll", handleScroll);},[visible]);
         console.log("viz",visible);
         

         
      

  
      return (
      
         <div>
            <animated.div style={props} className={"navbar " + (!visible ? "" : " ")}>
               <a href="#">Item 1</a>
               <a href="#">Item 2</a>
               <a href="#">Item 3</a>
            </animated.div>
            <p>
            ....
            </p>
         </div>
         )
      }
      export default Hooksnav;