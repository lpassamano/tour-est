import React, { Component } from "react";

class CreateTourForm extends Component {
  state = { title: "" };

  handleSubmit = event => {};

  handleChange = event => {};

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          type="text"
          id="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type="submit">Create Tour</button>
      </form>
    );
  }
}

export default CreateTourForm;
