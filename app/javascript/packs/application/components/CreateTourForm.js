import React, { Component } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import AddPointForm from "./AddPointForm";

class CreateTourForm extends Component {
  static defaultProps = { navigate };
  state = {
    title: "",
    starting_point: "",
    directions: "",
    estimated_time: "",
    description: "",
    numPoints: 0,
    points: []
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { id, cultural_center } = this.props.currentStaffUser;
    const {
      title,
      starting_point,
      directions,
      estimated_time,
      description
    } = this.state;
    const result = await this.props.onCreateTour({
      tour: {
        title: this.state.title,
        staff_user_id: id,
        cultural_center_id: cultural_center.id,
        starting_point: starting_point,
        directions: directions,
        estimated_time: estimated_time,
        description: description
      }
    });

    if (result.ok) {
      this.props.navigate(`/tours/${result.data.id}`);
      this.setState({ title: "" });
    } else {
      console.error(result.data.error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePointChange = (point, index) => {
    if (this.state.points[index]) {
      this.setState({
        points: Object.assign([...this.state.points], { [index]: point })
      });
    } else {
      this.setState({
        points: [...this.state.points, point]
      });
    }
  };

  onAddPoint = event => {
    event.preventDefault();
    this.setState({
      numPoints: this.state.numPoints + 1
    });
  };

  render() {
    // TODO: mark title field as required
    let points = [];

    for (var i = 0; i < this.state.numPoints; i += 1) {
      points.push(
        <AddPointForm
          key={i}
          index={i}
          handlePointChange={this.handlePointChange}
        />
      );
    }

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
        <div id="points">{points}</div>
        <a href="#" onClick={this.onAddPoint}>
          Add Point to Tour
        </a>
        <br />
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
