import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginPage from './components/login-page/login-page.component';

const App = () => (
  <Router>
    <Route exact path="/" component={LoginPage} />
  </Router>
);

export default App;
