import React, { Component } from 'react'
import { Router, Link } from '@reach/router'

import LoginForm from './LoginForm'

const App = () => (
  <div>
    <h1>Tour-est</h1>
    <LoginForm />
    <Router>
      <LoginForm path="/login" />
    </Router>
  </div>
);

export default App;
