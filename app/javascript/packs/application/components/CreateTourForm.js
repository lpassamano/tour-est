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
        staff_user_id: this.props.staffUserId,
        cultural_center_id: this.props.culturalCenterId
      }
    });

    if (result.ok) {
      this.props.navigate("/");
      this.setState({ title: "" });
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
  staffUserId: PropTypes.number.isRequired,
  culturalCenterId: PropTypes.number.isRequired
};

export default CreateTourForm;