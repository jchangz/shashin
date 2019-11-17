import React, {useState, Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import {useSpring, useTrail, animated} from 'react-spring';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import {Spring} from 'react-spring/renderprops';

const items = ['Japan', 'Latest', 'Studio', 'Nostalgia', 'Travel'];
const config = { mass: 5, tension: 2000, friction: 200 };
const routes = ['', 'Latest', 'Studio'];


function Header() {
  
  const [state, toggle] = useState(true)
  const props = useSpring({opacity: state ? 1: 0, transform: state ? "translateY(0px)": "translateY(15%)"})
  const propss = useSpring({transform: state ? "translateY(-100%)": "translateY(0)"})
  const trail = useTrail(items.length, {
    config,
    opacity: state ? 0 : 1,
    x: state ? 20 : 0,
    height: state ? 0 : 100,
    from: { opacity: 1, x: 0, height:100 },

  });

  return(
  <header>
    <nav>
    
    <animated.div style={propss} className="headerpage">

      {trail.map(({ x, height, ...rest }, index) => ( <animated.li key={items[index]} className="navbuttons" style=
      {{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
        <animated.a style={{ height }}>
        <Link onClick={() => toggle(!state)} to={routes[index]}>{items[index]}</Link>
        </animated.a>
        </animated.li>))}
    
 
      </animated.div>
      <button className="btn" onClick={() => toggle(!state)}>
	<div class="hamburger-1"></div>
	<animated.div style={props} className="hamburger-2" ></animated.div>
	<div class="hamburger-3"></div>
  <div class="hamburger-4"></div>
    </button>
    </nav>

    
  </header>
  )
  };




export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", throttle(this.handleScroll,250, {leading: true}));
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const minimumscroll = 200;
    const currentScrollPos = window.pageYOffset;
   
    const visible = prevScrollpos > currentScrollPos;


    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });


    
    if (currentScrollPos < minimumscroll){
    this.setState({
      visible:true
    })
    }
  };

  render() {
    const props = {transform: (this.state.visible ? "scaleX(0.1)" : "scaleX(-150)")}
    return (
      console.log("hello2", this.state),
      <div>
        <Header />
      <div className="logo">
      <div className="utsurundesu">
      <img src="http://167.99.106.90/img/shashin.svg"></img>
    <div className="utsurundesu-hide" style={{transform: (this.state.visible ? "scaleX(0.1)" : "scaleX(-150)")}}></div>
      {/*{this.state.visible ? (<div className="utsurundesu-hide"></div>): (
      <Spring
  from={{ transform: "scaleX(0.1)" }}
  to={{ transform:"scaleX(-150)" }}>
  {props => <div style={props} className="utsurundesu-hide"></div>}
</Spring>
      )}*/}
      </div>
      </div>
     </div>
  
    );
  }
}