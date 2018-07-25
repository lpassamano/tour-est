import React, { Component } from 'react'
import { Router, Link } from '@reach/router'

import LoginForm from './LoginForm'
import StaffUserDashboard from './StaffUserDashboard'

const App = () => (
  <div>
    <h1>Tour-est</h1>
    <LoginForm />
    <Router>
      <LoginForm path="/sessions" />
      <StaffUserDashboard path="/staff_user" />
    </Router>
  </div>
);

export default App;
