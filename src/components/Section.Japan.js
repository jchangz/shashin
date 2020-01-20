import React, {useState} from 'react';
import '../App.css';
import {useSpring, useTrail, animated} from 'react-spring';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../hooks/lazyloadFadeIn.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

const items = 
[
  '  https://live.staticflickr.com/65535/48034089697_3e1ecbe66a_o.jpg'
  , 'https://live.staticflickr.com/65535/48047965856_74dff9e275_b.jpg'
  , 'https://live.staticflickr.com/65535/48033978411_1f263e8b98_o.jpg'
  , 'https://live.staticflickr.com/65535/48034022103_278e793262_o.jpg'
]

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

const JapanSection = ()=> {
    
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


class Japan extends React.Component {
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
        <JapanSection />
      </div>
    )
  }
}

export default Japan;