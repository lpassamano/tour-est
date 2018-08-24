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

export class App extends Component {
  componentDidMount() {
    this.props.authenticateStaffUser();
  }

  componentDidUpdate(prevProps) {
    const wasLoggedIn = !!prevProps.currentStaffUser;
    const isLoggedIn = !!this.props.currentStaffUser;

    if (wasLoggedIn === isLoggedIn) {
      return;
    }

    if (isLoggedIn) {
      return navigate("/admin");
    }

    if (wasLoggedIn) {
      return navigate("/login");
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logoutStaffUser();
  };

  render() {
    return (
      <div>
        <h1>Tour-est</h1>
        {this.props.currentStaffUser ? (
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

        {this.props.currentStaffUser ? (
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
            <LoginForm path="/login" onLogin={this.props.loginStaffUser} />
            <CreateAccountForm
              path="/sign-up"
              onCreateUser={this.props.createStaffUser}
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
  createStaffUser: staffUserActions.createStaffUser,
  loginStaffUser: staffUserActions.loginStaffUser,
  authenticateStaffUser: staffUserActions.authenticateStaffUser,
  logoutStaffUser: staffUserActions.logoutStaffUser
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(App);
