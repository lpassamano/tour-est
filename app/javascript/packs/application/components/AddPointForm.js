import React, { Component } from "react";
import { navigate } from "@reach/router";

class AddPointForm extends Component {
  state = {
    caption: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { caption } = this.state;
    const result = await this.props.onCreatePoint({
      point: {
        caption: caption
      }
    });

    if (result.ok) {
      this.setState({ caption: "" });
      this.props.onHide();
    } else {
      console.error(result.data.error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Upload Image (WIP)</p>
        <label htmlFor="caption">Caption: </label>
        <textarea
          name="caption"
          id="caption"
          type="text"
          value={this.state.caption}
          onChange={this.handleChange}
        />
        <button type="submit" id="save">
          Save
        </button>
        <button type="button" onClick={this.props.onHide}>
          Cancel
        </button>
        <button type="button" id="save_and_add" onClick={this.handleSubmit}>
          Save and add another point
        </button>
      </form>
    );
  }
}

export default AddPointForm;
