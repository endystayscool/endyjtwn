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
          <Route path="/">
            <Work />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
