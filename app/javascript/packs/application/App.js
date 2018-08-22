import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { connect } from "react-redux";

import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import StaffUserDashboard from "./components/StaffUserDashboard";
import CreateTourForm from "./components/CreateTourForm";
import TourContainer from "./components/TourContainer";
import api from "./api";
import * as staffUserActions from "./redux/staffUser/actions";
import * as staffUserSelectors from "./redux/staffUser/selectors";

class App extends Component {
  componentDidMount() {
    this.props.authenticateStaffUser();
  }

  loginStaffUser = async (username, password) => {
    const result = await api.login(username, password);

    if (result.ok) {
      return this.props.authenticateStaffUser();
    }

    return result;
  };

  handleLogout = event => {
    event.preventDefault();
    this.props.logoutStaffUser();
    navigate("/login");
  };

  registerStaffUser = async attributes => {
    const userResult = await api.createStaffUser(attributes);
    const { username, password } = attributes.user;

    if (userResult.ok) {
      return this.loginStaffUser(username, password);
    }

    return userResult;
  };

  render() {
    return (
      <div>
        <h1>Tour-est</h1>
        {this.props.currentStaffUser.id ? (
          <nav>
            <Link to="/admin">Home</Link>
            <Link to="/tours/new">Create Tour</Link>
            <a href="#" onClick={this.handleLogout}>
              Log Out
            </a>
          </nav>
        ) : (
          <nav>
            <Link to="/login">Sign In</Link>
            <Link to="/sign-up">Create Account</Link>
          </nav>
        )}

        {this.props.currentStaffUser.id ? (
          <Router>
            <StaffUserDashboard
              path="/admin"
              currentStaffUser={this.props.currentStaffUser}
            />
            <CreateTourForm
              path="/tours/new"
              currentStaffUser={this.props.currentStaffUser}
            />
            <TourContainer path="/tours/:tourId" />
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

const mapStateToProps = state => ({
  currentStaffUser: staffUserSelectors.getStaffUser(state)
});

const mapDispatchToProps = {
  authenticateStaffUser: staffUserActions.authenticateStaffUser,
  logoutStaffUser: staffUserActions.logoutStaffUser
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(App);
