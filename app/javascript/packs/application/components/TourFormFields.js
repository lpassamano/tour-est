import React, { Component } from "react";
import PropTypes from "prop-types";

export class TourFormFields extends Component {
  state = {
    title: "",
    starting_point: "",
    directions: "",
    estimated_time: "",
    description: ""
  };

  componentDidMount = () => {
    if (this.props.initialValues) {
      this.setState(this.props.initialValues);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      title,
      starting_point,
      directions,
      estimated_time,
      description
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="starting_point">Starting Point: </label>
        <input
          name="starting_point"
          type="text"
          value={starting_point}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="directions">Directions: </label>
        <input
          name="directions"
          type="text"
          value={directions}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="estimated_time">Estimated Time: </label>
        <input
          name="estimated_time"
          type="text"
          value={estimated_time}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          type="text"
          value={description}
          onChange={this.handleChange}
        />
        <br />
        <button type="submit">Save Tour</button>
      </form>
    );
  }
}

TourFormFields.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    starting_point: PropTypes.string,
    directions: PropTypes.string,
    estimated_time: PropTypes.string,
    description: PropTypes.string
  })
};

export default TourFormFields;
