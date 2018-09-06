import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-foundation";

export class TourFormFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      starting_point: "",
      directions: "",
      estimated_time: "",
      description: "",
      ...this.props.initialValues
    };
  }

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
        <p>Tell your visitors where they should go to begin the tour</p>
        <input
          name="starting_point"
          type="text"
          value={starting_point}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="directions">Directions: </label>
        <p>Let visitors know how to get to the starting point of the tour.</p>
        <textarea
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
        <textarea
          name="description"
          type="text"
          value={description}
          onChange={this.handleChange}
        />
        <br />
        <Button type="submit">Save</Button>
      </form>
    );
  }
}

TourFormFields.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    starting_point: PropTypes.string,
    directions: PropTypes.string,
    estimated_time: PropTypes.string,
    description: PropTypes.string
  })
};

TourFormFields.defaultProps = {
  initialValues: {}
};

export default TourFormFields;
