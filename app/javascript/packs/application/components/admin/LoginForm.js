import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as staffUserActions from "../../redux/staffUser/actions";

export class LoginForm extends Component {
  state = { username: "", password: "" };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
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
          value={this.state.username}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  onLogin: staffUserActions.loginStaffUser
};

const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(LoginForm);
