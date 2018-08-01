import React, { Component } from "react";
import { navigate } from "@reach/router";

// TODO add prop types

class CreateAccountForm extends Component {
  // static defaultProps = { navigate: "/" };
  static defaultProps = { navigate };
  state = { username: "", password: "", cultural_center: "" };

  handleSubmit = async event => {
    event.preventDefault();
    const result = await this.props.onCreateUser(
      this.state.username,
      this.state.password
    );
    if (result.ok) {
      // this.props.navigate;
      this.props.navigate("/");
    } else {
      console.error(result.data.error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // TODO
  // 1. password confirmation field - need to fix that on server side first
  // 2. add cultural center field
  // see if any other fields are necessary for the form!

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
