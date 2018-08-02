import React, { Component } from "react";
import { Router, Link } from "@reach/router";

import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import StaffUserDashboard from "./components/StaffUserDashboard";
import api from "./api";

class App extends Component {
  state = {
    currentStaffUser: null
  };

  authenticateStaffUser = async () => {
    const result = await api.authenticateStaffUser();
    if (result.ok) {
      this.setState({ currentStaffUser: result.data });
    }
    return result;
  };

  loginStaffUser = async (username, password) => {
    const result = await api.login(username, password);
    if (result.ok) {
      this.setState({ currentStaffUser: result.data });
    }
    return result;
  };

  registerStaffUser = async (...attributes) => {
    const userResult = await api.createStaffUser(attributes);
    if (userResult.ok) {
      return this.loginStaffUser(attributes.username, attributes.password);
    }
    return userResult;
  };

  render() {
    return (
      <div>
        <h1>Tour-est</h1>
        <nav>
          <Link to="/">Sign In</Link>
        </nav>

        <Router>
          {this.state.currentStaffUser ? (
            <StaffUserDashboard
              path="/"
              onAuthenticate={this.authenticateStaffUser}
            />
          ) : (
            <LoginForm
              path="/"
              onLogin={this.loginStaffUser}
            />
          )}
          <CreateAccountForm
            path="/create-account"
            onCreateUser={this.registerStaffUser}
          />
        </Router>
      </div>
    );
  }
}

export default App;
