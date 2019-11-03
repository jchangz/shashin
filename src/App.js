import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CMRK from './components/camerarollkyoto.js';
import Header from "./components/Header";
import Japan from './components/Section.Japan.js';
import Latest from './components/Section.Latest.js';
import Studio from './components/Section.Studio.js';
import { TransitionGroup, Transition, CSSTransition } from "react-transition-group";

function App() {
  return (
    <Router>

       <Header />
       <Route render={({location}) => (
          <TransitionGroup className="transition-group">
            <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }} classNames={"fade"} unmountOnExit>
            <section className="route-section">
              <Switch location={location}>
                <Route exact path="/" component={Japan} />
                <Route path="/Latest" render={({ match: { path } }) => (
                  <div>
                    <Route exact path={path} component={Latest} />
                    <Route path={`${path}/camerarollkyoto`} component={CMRK} />
                  </div>
                )}/>
                <Route path="/Studio" component={Studio} />
              </Switch>
              </section>
            </CSSTransition>
          </TransitionGroup>
         )}
        />

      
    </Router>
    
  );
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
