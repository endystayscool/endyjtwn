import React from 'react';
import './App.scss';
import Main from './Main/Main';
import Work from './Work/Work';

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
          <Route path="/works">
            <Work />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
