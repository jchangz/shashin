import React, {useState, Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import {useSpring, useTrail, animated} from 'react-spring';
import debounce from 'lodash/debounce';

function Header() {
  
  const [state, toggle] = useState(true)
  const props = useSpring({opacity: state ? 1: 0, transform: state ? "translateY(0px)": "translateY(15%)", config: {duration: 100}})

  return(
  <header>
    <nav>
      
      <ul style={{ listStyleType: "none" }}>
        <li style={{ display: "inline", marginRight: 10 }}>
          <Link to="/">Japan</Link>
        </li>
        <li style={{ display: "inline", marginRight: 10 }}>
          <Link to="/Latest">Latest</Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/Studio">Studio</Link>
        </li>
      </ul>
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
    window.addEventListener("scroll", debounce(this.handleScroll,100, {leading: true}));
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  render() {
    return (
      console.log("hello2", this.state),
      <div>
        <Header />
      <div className="logo">
      <div className="utsurundesu">
      <img src="http://167.99.106.90/img/shashin.svg"></img>
      {/*    <div className={this.state.visible ? "utsurundesu-hide" : "utsurundesu-hide2"}></div>*/}
      <div className="utsurundesu-hide" style={{transform: (this.state.visible ? "scaleX(0.1)" : "scaleX(-150)")}}></div>
      </div>
      </div>
     </div>
  
    );
  }
}