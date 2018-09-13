import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Point from "./Point";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";

export class PointsList extends Component {
  componentDidMount() {
    this.props.listPoints(this.props.tourId);
  }

  render() {
    const { isFetching, points } = this.props;
    if (isFetching) {
      return <p>loading... please wait!</p>;
    }

    if (!points) {
      return <p>Add points to your tour by clicking the button below!</p>;
    }

    return (
      <div>
        {points.map(point => (
          <Point point={point} key={point.id} tourId={this.props.tourId} />
        ))}
      </div>
    );
  }
}

PointsList.propTypes = {
  points: PropTypes.array.isRequired,
  tourId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  listPoints: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  points: pointSelectors.getPoints(state),
  tourId: ownProps.tourId,
  isFetching: pointSelectors.isFetching(state)
});

const mapDispatchToProps = { listPoints: pointActions.listPoints };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(PointsList);
