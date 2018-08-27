import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";

class PointsList extends Component {
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
      <div>{points.map(point => <h4 key={point.id}>{point.caption}</h4>)}</div>
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
