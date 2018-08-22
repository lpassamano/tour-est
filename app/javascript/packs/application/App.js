import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";

import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import StaffUserDashboard from "./components/StaffUserDashboard";
import CreateTourForm from "./components/CreateTourForm";
import TourContainer from "./components/TourContainer";
import api from "./api";

const INITIAL_STATE = {
  currentStaffUser: null
  // tour: {
  //   data: null,
  //   isFetching: false
  // }
};

class App extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.authenticateStaffUser();
  }

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
      return this.authenticateStaffUser();
    }

    return result;
  };

  logoutStaffUser = event => {
    event.preventDefault();
    api.removeAuthToken();

    this.setState(INITIAL_STATE, () => navigate("/login"));
  };

  registerStaffUser = async attributes => {
    const userResult = await api.createStaffUser(attributes);
    const { username, password } = attributes.user;

    if (userResult.ok) {
      return this.loginStaffUser(username, password);
    }

    return userResult;
  };

  registerPoint = async attributes => {
    const tourId = this.state.tour.data.id;
    const pointResult = await api.createPoint(tourId, attributes);
    return pointResult;
  };

  render() {
    return (
      <div>
        <h1>Tour-est</h1>
        {this.state.currentStaffUser ? (
          <nav>
            <Link to="/admin">Home</Link>
            <Link to="/tours/new">Create Tour</Link>
            <a href="#" onClick={this.logoutStaffUser}>
              Log Out
            </a>
          </nav>
        ) : (
          <nav>
            <Link to="/login">Sign In</Link>
            <Link to="/sign-up">Create Account</Link>
          </nav>
        )}

        {this.state.currentStaffUser ? (
          <Router>
            <StaffUserDashboard
              path="/admin"
              currentStaffUser={this.state.currentStaffUser}
            />
            <CreateTourForm
              path="/tours/new"
              currentStaffUser={this.state.currentStaffUser}
            />
            <TourContainer
              path="/tours/:tourId"
              onCreatePoint={this.registerPoint}
            />
          </Router>
        ) : (
          <Router>
            <LoginForm path="/login" onLogin={this.loginStaffUser} />
            <CreateAccountForm
              path="/sign-up"
              onCreateUser={this.registerStaffUser}
            />
          </Router>
        )}
      </div>
    );
  }
}

export default App;
