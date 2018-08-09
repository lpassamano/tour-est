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
    const { id, cultural_center } = this.props.currentStaffUser;
    const result = await this.props.onCreateTour({
      tour: {
        title: this.state.title,
        staff_user_id: id,
        cultural_center_id: cultural_center.id
      }
    });

    if (result.ok) {
      this.props.navigate("/admin");
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
  currentStaffUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cultural_center: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  })
};

export default CreateTourForm;
