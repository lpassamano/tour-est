import React, { Component } from 'react'
import { navigate } from "@reach/router"

import api from '../api'

class LoginForm extends Component {
  state = { username: "", password: "" }

  handleSubmit = async (event) => {
    event.preventDefault();
    const result = await api.login(this.state.username, this.state.password)
    if (result.ok) {
      navigate('/staff_user')
    } else {
      console.error(result.data.error)
    }
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
