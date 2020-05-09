import React from 'react';
import '../App.css';
import LazyLoad from 'react-lazy-load';
import ImageLoader from '../hooks/lazyloadFadeIn.js';
import useWindowSize from '../hooks/useWindowSize.js';
import ImageScroller from '../hooks/imageScroller.js';
import {
  Link,
} from "react-router-dom";
const items = [
  'https://live.staticflickr.com/65535/48135300432_4ef5c106de_b.jpg', 
  'https://live.staticflickr.com/65535/48420919721_783b7335be_k.jpg', 
  'https://live.staticflickr.com/65535/48165937296_8e7afc1769_b.jpg',
  'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg',
  'https://live.staticflickr.com/65535/48135206926_8d5ea89d81_c.jpg',
  'https://live.staticflickr.com/65535/48034021928_1942b50c84_c.jpg']

const itemss =
[
    "one"
  , "two"
  , "three"
  , "four"
  , "five"
  , "six"
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
    "Camera Roll Kyoto"
  , "Tokyo"
  , "Article3"
  , "Article4"
  , "Article5"
]
/*const subtitle =
[
    "Kyoto through the lens of an iPhone"
  , "The city that never sleeps"
  , "Article3"
  , "Article4"
  , "Article5"
]
const hero = ['https://live.staticflickr.com/1961/45173255361_a5653299af_b.jpg']
/*const subtitle = [
  'http://167.99.106.90/img/camerarollkyotoorange.svg'
]*/

const LatestSection = ()=> {
  const [width] = useWindowSize();
  const responsive = width > 769 ? " desktop" : " mobile";

  return (

  <div>
    <ImageScroller className={"App" + responsive}>
      {items.map(({props}, index) => (
        <Link to={`/Latest/CameraRollKyoto`} class={"japanp " + itemss[index]}>
          <div class={"reflow2" + responsive}>
            <LazyLoad height={'100%'} >
              <ImageLoader className={"imghun " + itemss[index]} src={items[index]}/>
            </LazyLoad>
          </div>
          <div className={"text "  + classes[index] + responsive}>
            <h4>{titles[index]}</h4>
          </div>       
        </Link>
      ))}
    </ImageScroller>
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