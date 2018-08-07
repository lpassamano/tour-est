import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

class CreateTourForm extends Component {
  static defaultProps = { navigate };
  state = {
    title: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const result = await this.props.onCreateTour({
      tour: {
        title: this.state.title,
        staff_user_id: this.props.staffUser,
        cultural_center_id: this.props.culturalCenter
      }
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

CreateTourForm.propTypes = {
  navigate: PropTypes.func.isRequired,
  onCreateTour: PropTypes.func.isRequired,
  staffUser: PropTypes.number.isRequired,
  culturalCenter: PropTypes.number.isRequired
};

export default CreateTourForm;
