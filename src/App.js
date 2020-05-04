import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CMRK from './components/camerarollkyoto.js';
import Navbar from "./components/Header";
import Hooksnav from "./components/Scroll.js";
import ImageScroller from './hooks/imageScroller.js';
import Latest from './components/Section.Latest.js';
import Studio from './components/Section.Studio.js';
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Router>

       {/*<Navbar />*/}
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

<ScrollToTop />
    </Router>
    
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}


export default App;
