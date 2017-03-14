import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home';

export default function renderRoutes() {
  return <Router>
    <Route path="/" component={Home} />
  </Router>;
}
