import React from 'react';
import Application from './main/application.js';
// import Header from './main/header.js';
import Content from './main/content.js';
import Navigation from './main/navigation.js';
import { LoadingProvider } from "./main/context/loadingContext.js";
import { IndexProvider } from "./main/context/indexContext.js";
import { OpenProvider } from "./main/context/openContext.js";
import './main/main.scss';

function Main() {
  return (
    <div className="main">
      {/* <Header /> */}
      <IndexProvider>
        <LoadingProvider>
          <OpenProvider>
            <Application />
            <Navigation />
            <Content />
          </OpenProvider>
        </LoadingProvider>
      </IndexProvider>
    </div>
  );
}

export default Main;