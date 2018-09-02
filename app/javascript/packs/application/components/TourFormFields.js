import React, { Component } from "react";
import PropTypes from "prop-types";

export class TourFormFields extends Component {
  handleChange = event => {
    this.props.onChange(event);
  };

  render() {
    const {
      title,
      starting_point,
      directions,
      estimated_time,
      description
    } = this.props.tour;

    return (
      <div>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          value={this.props.title}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="starting_point">Starting Point: </label>
        <input
          name="starting_point"
          type="text"
          value={this.props.starting_point}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="directions">Directions: </label>
        <input
          name="directions"
          type="text"
          value={this.props.directions}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="estimated_time">Estimated Time: </label>
        <input
          name="estimated_time"
          type="text"
          value={this.props.estimated_time}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          type="text"
          value={this.props.description}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

TourFormFields.propTypes = {
  tour: PropTypes.shape({
    title: PropTypes.string,
    starting_point: PropTypes.string,
    directions: PropTypes.string,
    estimated_time: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default TourFormFields;
