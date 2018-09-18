import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

export class Tour extends Component {
  componentDidMount() {
    this.props.getTour(this.props.tourId);
  }

  render() {
    const { isFetching, tour } = this.props;

    if (isFetching || !tour) {
      return <p>loading... please wait!</p>;
    }

    const {
      title,
      description,
      estimated_time,
      starting_point,
      directions
    } = tour;

    return (
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {estimated_time && <p>Estimated time: {estimated_time}</p>}
        {starting_point && <p>Start here: {starting_point}</p>}
        {directions && <p>How to get there: {directions}</p>}
      </div>
    );
  }
}

Tour.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    starting_point: PropTypes.string,
    directions: PropTypes.string,
    estimated_time: PropTypes.string,
    description: PropTypes.string
  }),
  isFetching: PropTypes.bool.isRequired,
  getTour: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  tour: tourSelectors.getTour(state, ownProps.tourId),
  isFetching: tourSelectors.isFetching(state)
});

const mapDispatchToProps = {
  getTour: tourActions.getTour
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(Tour);
