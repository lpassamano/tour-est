import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

class LoginForm extends Component {
  static defaultProps = { navigate };
  state = { username: "", password: "" };

  handleSubmit = async event => {
    event.preventDefault();
    const result = await this.props.onLogin(
      this.state.username,
      this.state.password
    );

    if (result.ok) {
      this.props.navigate("/admin");
    } else {
      console.error(result.data.error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          type="text"
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          name="password"
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  navigate: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default LoginForm;
