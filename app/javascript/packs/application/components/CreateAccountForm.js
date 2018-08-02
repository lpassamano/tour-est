import React, { Component } from "react";
import { navigate } from "@reach/router";

// TODO
// see if any other fields are necessary for the form!
// 2. add in note about password requirements (10 characters min)
// 3. add in field for password errors
// 4. add prop types

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
      username: this.state.username,
      password: this.state.password,
      cultural_center: this.state.cultural_center
    });
    console.log(result);
    if (result.ok) {
      this.props.navigate("/");
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

export default CreateAccountForm;
