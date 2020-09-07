import React from 'react';
import './App.scss';
import Main from './Main/Main';
import Work from './Work/Work';
import Test from './Test/Test';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Test />
          </Route>
          <Route path="/work">
            <Work />
          </Route>
          <Route path="/test">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
