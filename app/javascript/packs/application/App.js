import React, { Component } from 'react'
import { Router, Link } from '@reach/router'

import LoginForm from './components/LoginForm'
import StaffUserDashboard from './components/StaffUserDashboard'

class App extends Component {
  render () {
    return (
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
  }
}

export default App;
