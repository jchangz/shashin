import React, {Component} from 'react';
import '../App.css';
import throttle from 'lodash/throttle';
import Navigation from './Navigation.js';


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
    return (
      console.log("hello2", this.state),
      <div>
 
        <Navigation />
        <div className="logoblock">
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
     </div>
  
    );
  }
}