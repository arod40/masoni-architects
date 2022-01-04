import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/alessandro">
            <Home name="alessandro" />
          </Route>
          <Route path="/andrea">
            <Home name="andrea" />
          </Route>
          <Route path="/massimo">
            <Home name="massimo" />
          </Route>
          <Route path="/">
            <Home name="generic" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
