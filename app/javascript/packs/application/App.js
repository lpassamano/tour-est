import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navigation from "./components/Navigation";
import LoginForm from "./components/admin/LoginForm";
import CreateAccountForm from "./components/admin/CreateAccountForm";
import StaffUserDashboard from "./components/admin/StaffUserDashboard";
import CreateTourForm from "./components/admin/CreateTourForm";
import UpdateTourForm from "./components/admin/UpdateTourForm";
import AdminTourContainer from "./components/admin/AdminTourContainer";
import UpdatePointForm from "./components/admin/UpdatePointForm";
import ToursList from "./components/ToursList";
import TourContainer from "./components/TourContainer";
import PointDetails from "./components/PointDetails";
import api from "./api";
import * as staffUserActions from "./redux/staffUser/actions";
import * as staffUserSelectors from "./redux/staffUser/selectors";

export class App extends Component {
  componentDidMount() {
    this.props.authenticateStaffUser();
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
          <Router className="container">
            <StaffUserDashboard path="/admin" default />
            <ToursList path="/admin/tours" />
            <CreateTourForm path="/admin/tours/new" />
            <UpdateTourForm path="/admin/tours/:tourId/edit" />
            <AdminTourContainer path="/admin/tours/:tourId" />
            <UpdatePointForm path="/admin/tours/:tourId/points/:pointId/edit" />
          </Router>
        ) : (
          <Router className="container">
            <LoginForm path="/login" />
            <CreateAccountForm path="/sign-up" />
            <ToursList path="/tours" default />
            <TourContainer path="/tours/:tourId" />
            <PointDetails path="/tours/:tourId/points/:pointId" />
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
