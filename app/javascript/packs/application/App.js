import React, { Component } from "react";
import { Router, Link } from "@reach/router";

import LoginForm from "./components/LoginForm";
import CreateAccountForm from "./components/CreateAccountForm";
import StaffUserDashboard from "./components/StaffUserDashboard";
import api from "./api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentStaffUser: null,
      tours: {
        data: null,
        isFetching: false
      }
    };
  }

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

    if (tourResult.ok) {
      this.setState(({ tours }) => ({
        tours: {
          ...tours,
          data: [...tours.data, tourResult.data]
        }
      }));
    }

    return tourResult;
  };

  listTours = async () => {
    this.setState({ tours: { isFetching: true, data: null } });
    const tourList = await api.listTours();
    this.setState({ tours: { isFetching: false, data: tourList.data } });
  };

  render() {
    return (
      <div>
        <h1>Tour-est</h1>
        <nav>
          <Link to="/">Sign In</Link>{" "}
          <Link to="/create-account">Create Account</Link>
        </nav>

        <Router>
          {this.state.currentStaffUser ? (
            <StaffUserDashboard
              path="/"
              onAuthenticate={this.authenticateStaffUser}
              currentStaffUser={this.state.currentStaffUser}
              tours={this.state.tours}
              listTours={this.listTours}
              onCreateTour={this.registerTour}
            />
          ) : (
            <LoginForm path="/" onLogin={this.loginStaffUser} />
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
