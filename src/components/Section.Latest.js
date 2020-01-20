import React, {useState} from 'react';
import '../App.css';
import {useSpring, useTrail, animated} from 'react-spring';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../hooks/lazyloadFadeIn.js';
import SectionLoader from '../hooks/sectionImageLoad.js';
import Loading from './Loading.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
const items = [
  'https://live.staticflickr.com/65535/48135300432_4ef5c106de_b.jpg', 
  'https://live.staticflickr.com/65535/48124445202_91c9c65c53_b.jpg', 
  'https://live.staticflickr.com/65535/48124385723_83993500a7_b.jpg',
  'https://live.staticflickr.com/65535/48112561962_fab0fd3dd7_b.jpg']
const config = { mass: 5, tension: 2000, friction: 200 }
const itemss =
[
    "one"
  , "two"
  , "three"
  , 4
  , 5
]
const classes =
[
    "camerarollkyoto"
  , "camerarolltokyo"
  , "Article3"
  , "Article4"
  , "Article5"
]
const titles =
[
    "CAMERA ROLL KYOTO"
  , "CAMERA ROLL TOKYO"
  , "Article3"
  , "Article4"
  , "Article5"
]
const subtitle =
[
    "Kyoto through the lens of an iPhone"
  , "The city that never sleeps"
  , "Article3"
  , "Article4"
  , "Article5"
]
/*const subtitle = [
  'http://167.99.106.90/img/camerarollkyotoorange.svg'
]*/

const LatestSection = ()=> {
    
  return (

  <div className="App">
    <animated.div >
      {items.map(({ }, index) => (
      <div>
        <Link to={`/Latest/CameraRollKyoto`}>
          <div class={"japanp " + itemss[index]}>
            <div class="reflow2">
            <LazyLoad height={'100%'} >
                <ImageLoader className={"imghun " + itemss[index]} src={items[index]}/>
                </LazyLoad>
            </div>
            <animated.div className={"text " + classes[index]}>
              <h4>{titles[index]}</h4>
              <p>{subtitle[index]}</p>
            </animated.div>       
          </div>
        </Link>
      </div>
      ))}
    </animated.div>
  </div>
  );

}

class Latest extends React.Component {
  constructor(props){
      super(props);
      this.state = {data: null};
  }

  componentDidMount(){
    this.handleImageLoaded();
  }
  
  handleImageLoaded() {

    function imgLoad(url) {
      return new Promise(function(resolve, reject) {
        var img = new Image();
        img.src = url;
        img.onload = function() {
          resolve(img);
        }
        img.onerror = reject
      });
    }

    let imageLoadpromises = items.map(imgLoad);

    Promise.all(imageLoadpromises ).then(() => {
      this.setState({data: true});
    });
  }

  render() {

    /*let { classNamedd } = this.props;
    let { classNameddd } = this.props;
    classNameddd = this.state.data ? "up" : "down";
    classNamedd = this.state.data ? "hello2" : "loaded";*/

    if (!this.state.data) {
      return(
        <div>
          <div className="progress"></div>
          <div className="App">
            <div className="loading-animated-background"></div>
            <div className="loading-animated-background"></div>
            <div className="loading-animated-background"></div>
            <div className="loading-animated-background"></div>
          </div>
        </div>
      )
    }

    return( 
      <div>
        <LatestSection />
      </div>
    )
  }
}

export default Latest;