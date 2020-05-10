import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CMRK from './components/camerarollkyoto.js';
import ImageScroller from './hooks/imageScroller.js';
import Latest from './components/Section.Latest.js';
import Studio from './components/Section.Studio.js';

function App() {
  return (
    <Router>
      <Route render={({location}) => (
          <Switch location={location}>
            <Route exact path="/" component={Studio} />
            <Route path="/Latest" render={({ match: { path } }) => (
              <div>
                <Route exact path={path} component={Latest} />
                <Route path={`${path}/CameraRollKyoto`} component={CMRK} />
              </div>
            )}/>
            <Route path="/Studio" component={ImageScroller} />
          </Switch>
        )}
      />
    </Router>
  );
}

export default App;