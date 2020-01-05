import React, {useState} from 'react';
import '../App.css';
import {useSpring, useTrail, animated} from 'react-spring';
import Loading from './Loading.js';
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

const Japan = ()=> {
  let { path, url } = useRouteMatch();
    const props = useSpring({opacity: 1, from: {opacity: 0}})
    const textfade = useSpring({opacity: 1, from: {opacity: 0}, delay:500, config: config.slow})
    const [toggle, set] = useState(true)

  const trail = useTrail(items.length, {
    config,
    delay: 250,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 400 : 0,
    from: { opacity: 0, x: 250, height: 0 },
  })

  const heightt = useSpring({opacity: 1, from: {opacity: 0}, delay:250, config: config.slow})
    return (
       


<animated.div  className="App">
 {/*<div className="trails-main" onClick={() => set(state => !state)}>
        <div >
          {trail.map(({ x, height, ...rest }, index) => (
            <animated.div
                key={items[index]}
                className="trails-text"
                style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                <animated.div style={{ height }}>
                    <a href="">
                    <img className="imghun" src={items[index]}></img>
                    </a>
                </animated.div>
            </animated.div>
          ))}
        </div>
          </div>*/}
          <animated.div style={heightt}>
{items.map(({ }, index) => (
  <div>
          <Link to={`/Latest/CameraRollKyoto`}>
            
            <div class={"japanp " + itemss[index]}>
 
<img className={"imghun " + itemss[index]} src={items[index]}></img>

  <animated.div className={"text " + classes[index]}>
    <h4>{titles[index]}</h4>
   <p>{subtitle[index]}</p>
  </animated.div>
  
         
         
          {/*<div className="subtitlecontainer">
  <img className="subtitletext" src={subtitle[index]}></img>
</div>*/}
         
</div></Link></div>))}
</animated.div>


      <header className="App-header">

                <animated.div style={props} className="timeline-item">
                    <div className="animated-background">
                    </div>
                    <animated.p style={props}>dskfjhsdkjfhsdjkf</animated.p>
                </animated.div>

    <div className="timeline-item">
        <div className="animated-background">
        </div>
    </div>

    <div className="timeline-item">
        <div className="animated-background">
        </div>
    </div>

    <div className="timeline-item">
        <div className="animated-background">
        </div>
    </div>

    <div className="timeline-item">
        <div className="animated-background">
        </div>
    </div>

      </header>
    </animated.div>
      );

}

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



 class BB extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: null};
    }

    componentDidMount(){
        this.handleImageLoaded();
    
        }

    imgLoad(url) {
        return new Promise(function(resolve, reject) {
          var img = new Image();
          img.src = url;
          img.onload = function() {
            resolve(img);
          }
          img.onerror = reject
        });
      }
     

    
    handleImageLoaded() {
        Promise.all(imageLoadpromises ).then(() => {
            this.setState({
                data: true
        });
          
            });
             console.log("hello", this.state)
      
    }
    render() {

        if (!this.state.data) {
            return(
              <div >
              <div className="loading-animated-background">
            
             </div>
             <div className="loading-animated-background">
            
             </div>
             <div className="loading-animated-background">
            
             </div>
             </div>
            )
        }
        return <div>
           
            <Japan />
            
        </div>;
    }
}
export default BB;