import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TourFormFields from "./TourFormFields";
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
        <TourFormFields onChange={this.handleChange} tour={this.state} />
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
