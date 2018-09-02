import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TourFormFields from "./TourFormFields";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

export class UpdateTourForm extends Component {
  state = {
    id: this.props.tour.id,
    title: this.props.tour.title,
    starting_point: this.props.tour.starting_point,
    directions: this.props.tour.directions,
    estimated_time: this.props.tour.estimated_time,
    description: this.props.tour.description
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      id,
      title,
      starting_point,
      directions,
      estimated_time,
      description
    } = this.state;
    this.props.onUpdateTour({
      tour: {
        id: id,
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
    const { isFetching, tour } = this.props;
    if (isFetching || !tour) {
      return <p>loading... please wait!</p>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <TourFormFields onChange={this.handleChange} tour={tour} />
        <button type="submit">Update Tour</button>
      </form>
    );
  }
}

UpdateTourForm.propTypes = {
  onUpdateTour: PropTypes.func.isRequired,
  tourId: PropTypes.string.isRequired,
  tour: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    starting_point: PropTypes.string,
    directions: PropTypes.string,
    estimated_time: PropTypes.string,
    description: PropTypes.string
  })
};

const mapStateToProps = (state, ownProps) => ({
  tour: tourSelectors.getTour(state, ownProps.tourId),
  isFetching: tourSelectors.isFetching(state)
});

const mapDispatchToProps = { onUpdateTour: tourActions.updateTour };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(UpdateTourForm);
