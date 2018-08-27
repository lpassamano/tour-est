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

    return (
      <div>
        <h2>{tour.title}</h2>
        <p>{tour.estimated_time}</p>
        <p>{tour.description}</p>
        <p>{tour.starting_point}</p>
        <p>{tour.directions}</p>
      </div>
    );
  }
}

Tour.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    starting_point: PropTypes.string.isRequired,
    directions: PropTypes.string.isRequired,
    estimated_time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  isFetching: PropTypes.bool.isRequired,
  getTour: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  tour: tourSelectors.getTour(state, ownProps.tourId),
  isFetching: tourSelectors.isFetching(state)
});

const mapDispatchToProps = { getTour: tourActions.getTour };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(Tour);
