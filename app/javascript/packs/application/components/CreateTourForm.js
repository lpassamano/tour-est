import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

export class CreateTourForm extends Component {
  state = {
    title: "",
    starting_point: "",
    directions: "",
    estimated_time: "",
    description: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { id, cultural_center } = this.props.currentStaffUser;
    const {
      title,
      starting_point,
      directions,
      estimated_time,
      description
    } = this.state;
    this.props.onCreateTour({
      tour: {
        title: title,
        staff_user_id: id,
        cultural_center_id: cultural_center.id,
        starting_point: starting_point,
        directions: directions,
        estimated_time: estimated_time,
        description: description
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          id="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="starting_point">Starting Point: </label>
        <input
          name="starting_point"
          type="text"
          id="starting_point"
          value={this.state.starting_point}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="directions">Directions: </label>
        <input
          name="directions"
          type="text"
          id="directions"
          value={this.state.directions}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="estimated_time">Estimated Time: </label>
        <input
          name="estimated_time"
          type="text"
          id="estimated_time"
          value={this.state.estimated_time}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          type="text"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Create Tour</button>
      </form>
    );
  }
}

CreateTourForm.propTypes = {
  onCreateTour: PropTypes.func.isRequired,
  currentStaffUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cultural_center: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  })
};

const mapDispatchToProps = { onCreateTour: tourActions.createTour };
const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(CreateTourForm);
