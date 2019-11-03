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


function Latest() {
    let { path, url } = useRouteMatch();

    return (

        <div className="App">
      <header className="App-header">
        
        <p>
          LATEST
        </p>
        
        <Link to={`${url}/camerarollkyoto`}>camerarollkyoto</Link>
    
      </header>

      
    </div>

      );

}

export default Latest;
