import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import StaffUserDashboard from "./components/StaffUserDashboard";
import CreateTourForm from "./components/CreateTourForm";
import UpdateTourForm from "./components/UpdateTourForm";
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
        <Navigation
          currentStaffUser={this.props.currentStaffUser}
          onLogout={this.handleLogout}
        />

        {this.props.currentStaffUser ? (
          <Router>
            <StaffUserDashboard path="/admin" />
            <CreateTourForm path="/tours/new" />
            <UpdateTourForm path="/tours/:tourId/edit" />
            <TourContainer path="/tours/:tourId" />
          </Router>
        ) : (
          <Router>
            <LoginForm path="/login" />
            <CreateAccountForm path="/sign-up" />
          </Router>
        )}
      </div>
    );
  }
}

App.propTypes = {
  currentStaffUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    cultural_center: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }),
  authenticateStaffUser: PropTypes.func.isRequired,
  logoutStaffUser: PropTypes.func.isRequired
};

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
