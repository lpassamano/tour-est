import React, { Component } from "react";
import { connect } from "react-redux";
import * as tourActions from "../redux/tours/actions";
import * as tourSelectors from "../redux/tours/selectors";

class Tour extends Component {
  componentDidMount() {
    this.props.getTour(this.props.tourId);
  }

  render() {
    const { isFetching, tour } = this.props;
    console.log("tour", tour);
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
