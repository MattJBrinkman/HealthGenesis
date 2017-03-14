import React from 'react';
import { BrowserRouter as Router, Route, IndexRoute } from 'react-router-dom';

import Container from './container';

export default function renderRoutes() {
  return <Router>
    <Route path="/" component={Container} />
  </Router>;
}
