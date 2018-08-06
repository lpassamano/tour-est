import React, { Component } from "react";

class CreateTourForm extends Component {
  state = { title: "" };

  handleSubmit = async event => {
    event.preventDefault();
    const result = await this.props.onCreateTour({
      tour: { title: this.state.title }
    });

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
