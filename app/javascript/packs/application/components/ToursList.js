import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

export class ToursList extends Component {
  componentDidMount() {
    this.props.listTours();
  }

  render() {
    const { isFetching, tours } = this.props;

    if (isFetching) {
      return <p>loading.... please wait!</p>;
    }

    return <div>{tours.map(tour => <h4 key={tour.id}>{tour.title}</h4>)}</div>;
  }
}

ToursList.propTypes = {
  tours: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  listTours: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tours: tourSelectors.getTours(state),
  isFetching: tourSelectors.isFetching(state)
});

const mapDispatchToProps = { listTours: tourActions.listTours };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(ToursList);
