import React, { Component } from 'react'
import { create } from 'apisauce'
import { navigate } from "@reach/router"

import App from './App'

// TODO: refactor so that this component does not contain state!

const api = create({
  baseURL: '/',
  headers: { 'x-csrf-token': document.querySelector("[name=csrf-token]").getAttribute("content") }
})

class LoginForm extends Component {
  state = { username: "", password: "" }

  handleSubmit = async (event) => {
    event.preventDefault();
    const result = await api.post("/sessions", this.state)
    if (result.ok) {
      const token = result.data.token
      console.log("Login successful.")
      api.setHeader('Authorization', `Token token="${token}"`);
      window.localStorage.setItem('token', token)
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
