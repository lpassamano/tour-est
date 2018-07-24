import React, { Component } from 'react'
import { create } from 'apisauce'

const api = create({
  baseURL: '/',
  headers: { 'x-csrf-token': document.querySelector("[name=csrf-token]").getAttribute("content") }
})

class LoginForm extends Component {
  state = { username: "", password: "" }

  handleSubmit = async (event) => {
    event.preventDefault();
    // const token = document.querySelector("[name=csrf-token]").getAttribute("content");
    // console.log(token);
    // this.setState({ [csrfToken]: token })
    // console.log(this.state)
    const result = await api.post("/sessions", this.state)
    if (result.ok) {
      console.log("Login successful!!!!", result.data)
    } else {
      console.error(result)
    }
  }
  // document.querySelector("[name=csrf-token]").getAttribute("content")

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
