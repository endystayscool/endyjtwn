import React from 'react';
import './App.scss';
import Portfolio from './Portfolio/Portfolio';
import Test from './Test/Test';
import About from './About/About';
import Contact from './Contact/Contact';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  if (window.location.pathname === '/') window.location.href = "https://www.endyjtwn.com/about";

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
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
            <Test />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
