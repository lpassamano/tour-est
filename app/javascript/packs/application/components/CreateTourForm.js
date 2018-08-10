import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

class CreateTourForm extends Component {
  static defaultProps = { navigate };
  state = {
    title: "",
    starting_point: "",
    directions: "",
    estimated_time: "",
    topic: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { id, cultural_center } = this.props.currentStaffUser;
    const {
      title,
      starting_point,
      directions,
      estimated_time,
      topic
    } = this.state;
    const result = await this.props.onCreateTour({
      tour: {
        title: this.state.title,
        staff_user_id: id,
        cultural_center_id: cultural_center.id,
        starting_point: starting_point,
        directions: directions,
        estimated_time: estimated_time,
        topic: topic
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
    // TODO: mark title field as required
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          type="text"
          id="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          name="starting_point"
          type="text"
          id="starting_point"
          value={this.state.starting_point}
          onChange={this.handleChange}
        />
        <input
          name="directions"
          type="text"
          id="directions"
          value={this.state.directions}
          onChange={this.handleChange}
        />
        <input
          name="estimated_time"
          type="text"
          id="estimated_time"
          value={this.state.estimated_time}
          onChange={this.handleChange}
        />
        <input
          name="topic"
          type="text"
          id="topic"
          value={this.state.topic}
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
