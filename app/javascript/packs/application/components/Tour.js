import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

export class Tour extends Component {
  componentDidMount() {
    this.props.getTour(this.props.tourId);
  }

  handleDeleteTour = event => {
    event.preventDefault();
    this.props.deleteTour(this.props.tourId);
  };

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
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
        {estimated_time ? <p>Estimated time: {estimated_time}</p> : null}
        {starting_point ? <p>Start here: {starting_point}</p> : null}
        {directions ? <p>How to get there: {directions}</p> : null}
        <Link to={"edit"}>Edit Tour</Link>
        <br />
        <a href="#" onClick={this.handleDeleteTour}>
          Delete Tour
        </a>
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
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  tour: tourSelectors.getTour(state, ownProps.tourId),
  isFetching: tourSelectors.isFetching(state)
});

const mapDispatchToProps = {
  getTour: tourActions.getTour,
  deleteTour: tourActions.deleteTour
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(Tour);
