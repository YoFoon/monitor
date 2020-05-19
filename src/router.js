import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App/App';

const RouterConfig = () => (
  <Router>
    <Route exact path="/" component={App} />
  </Router>
);

export default RouterConfig;
