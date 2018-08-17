import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";

import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import StaffUserDashboard from "./components/StaffUserDashboard";
import CreateTourForm from "./components/CreateTourForm";
import TourContainer from "./components/TourContainer";
import api from "./api";

const INITIAL_STATE = {
  currentStaffUser: null,
  tours: {
    data: null,
    isFetching: false
  },
  tour: {
    data: null,
    isFetching: false
  },
  points: {
    data: null,
    isFetching: false
  }
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

  registerTour = async attributes => {
    const tourResult = await api.createTour(attributes);
    return tourResult;
  };

  listTours = async () => {
    this.setState({ tours: { isFetching: true, data: null } });
    const tourList = await api.listTours();
    this.setState({ tours: { isFetching: false, data: tourList.data } });
  };

  showTour = async tourId => {
    this.setState({ tour: { isFetching: true, data: null } });
    const tour = await api.getTour(tourId);
    this.setState({ tour: { isFetching: false, data: tour.data } });
  };

  registerPoint = async attributes => {
    const tourId = this.state.tour.data.id;
    const pointResult = await api.createPoint(tourId, attributes);
    return pointResult;
  };

  listPoints = async tourId => {
    this.setState({ points: { isFetching: true, data: null } });
    const pointList = await api.listPoints(tourId);
    this.setState({ points: { isFetching: false, data: pointList.data } });
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
              tours={this.state.tours}
              listTours={this.listTours}
            />
            <CreateTourForm
              path="/tours/new"
              onCreateTour={this.registerTour}
              currentStaffUser={this.state.currentStaffUser}
            />
            <TourContainer
              path="/tours/:tourId"
              tour={this.state.tour}
              points={this.state.points}
              showTour={this.showTour}
              onCreatePoint={this.registerPoint}
              listPoints={this.listPoints}
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
