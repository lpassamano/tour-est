import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

// TODO
// see if any other fields are necessary for the form!
// 2. add in note about password requirements (10 characters min)
// 3. add in field for password errors

class CreateAccountForm extends Component {
  static defaultProps = { navigate };
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    cultural_center: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const result = await this.props.onCreateUser({
      user: {
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      },
      cultural_center: {
        name: this.state.cultural_center
      }
    });

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
        <input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          value={this.state.password_confirmation}
          onChange={this.handleChange}
        />
        <input
          name="cultural_center"
          type="text"
          id="cultural_center"
          value={this.state.cultural_center}
          onChange={this.handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

CreateAccountForm.propTypes = {
  navigate: PropTypes.func.isRequired,
  onCreateUser: PropTypes.func.isRequired
};

export default CreateAccountForm;
