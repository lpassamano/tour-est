import React, { Component } from 'react'

class LoginForm extends Component {
  state = { username: "", password: "" }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default LoginForm;
