import React from 'react';
import './App.scss';
import Portfolio from './Portfolio/Portfolio';
import Loading from './Loading/Loading';
import About from './About/About';
import Contact from './Contact/Contact';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  if (window.location.pathname === '/') {
    setTimeout(() => {
      window.location.href = "https://www.endyjtwn.me/about";
    }, 1000);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Loading />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
