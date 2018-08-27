import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as staffUserActions from "../redux/staffUser/actions";

class CreateAccountForm extends Component {
  static defaultProps = { navigate };
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    cultural_center: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onCreateUser({
      user: {
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      },
      cultural_center: {
        name: this.state.cultural_center
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="password_confirmation">Confirm Password: </label>
        <input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          value={this.state.password_confirmation}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="cultural_center">Organization: </label>
        <input
          name="cultural_center"
          type="text"
          id="cultural_center"
          value={this.state.cultural_center}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

CreateAccountForm.propTypes = {
  navigate: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onCreateUser: staffUserActions.createStaffUser
};

const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(CreateAccountForm);
