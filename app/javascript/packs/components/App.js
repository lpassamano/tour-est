import React, { Component } from 'react'
import { Router, Link } from '@reach/router'

import LoginForm from './LoginForm'
import StaffUserDashboard from './StaffUserDashboard'

const App = () => (
  <div>
    <h1>Tour-est</h1>
    <nav>
      <Link to="/">Sign In</Link>
    </nav>

    <Router>
      <LoginForm path="/" />
      <StaffUserDashboard path="/" />
    </Router>
  </div>
);

export default App;
