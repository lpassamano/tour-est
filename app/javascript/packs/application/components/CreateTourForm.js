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
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="starting_point">Starting Point: </label>
        <input
          name="starting_point"
          type="text"
          value={this.state.starting_point}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="directions">Directions: </label>
        <input
          name="directions"
          type="text"
          value={this.state.directions}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="estimated_time">Estimated Time: </label>
        <input
          name="estimated_time"
          type="text"
          value={this.state.estimated_time}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          type="text"
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
  onCreateTour: PropTypes.func.isRequired
};

const mapDispatchToProps = { onCreateTour: tourActions.createTour };
const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(CreateTourForm);
