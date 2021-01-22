import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginPage from './components/login-page/login-page.component';
import Messenger from './components/messenger/messenger.component';

const App = () => (
  <Router>
    <Route exact path="/" component={LoginPage} />
    <Route path="/simple-messenger" component={Messenger} />
  </Router>
);

export default App;
