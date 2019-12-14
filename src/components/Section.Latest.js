import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import CMRK from './camerarollkyoto.js';
import {useSpring, animated} from 'react-spring';


function Latest() {
    let { path, url } = useRouteMatch();
    const props = useSpring({opacity: 1, from: {opacity: 0}})

    return (

        <div className="App">
      <header className="App-header">
        
        <p>
          LATEST
        </p>
        
        <animated.div style={props} className="timeline-item">
        <div className="animated-background">
        <Link to={`${url}/CameraRollKyoto`}>camerarollkyoto</Link>
        </div>
    </animated.div>
        
    
      </header>

      
    </div>

      );

}

export default Latest;
