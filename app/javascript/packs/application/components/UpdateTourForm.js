import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TourFormFields from "./TourFormFields";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

export class UpdateTourForm extends Component {
  handleSubmit = attributes => {
    this.props.onUpdateTour({ tour: attributes });
  };

  render() {
    const { isFetching, tour } = this.props;
    if (isFetching || !tour) {
      return <p>loading... please wait!</p>;
    }

    return (
      <TourFormFields
        onSubmit={this.handleSubmit}
        initialValues={this.props.tour}
      />
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
