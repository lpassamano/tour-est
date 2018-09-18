import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";

export class PointCards extends Component {
  componentDidMount() {
    this.props.listPoints(this.props.tourId);
  }

  render() {
    const { isFetching, points } = this.props;
    if (isFetching) {
      return <p>loading... please wait!</p>;
    }

    return (
      <div className="point-cards-container">
        {points.map(point => (
          <div className="point-card" key={point.id}>
            {point.image && (
              <img className="point-card-image" src={point.image} alt=" " />
            )}
            <div className="point-card-info">
              <h4 className="point-card-title">{point.title}</h4>
              <p className="point-card-caption">{point.caption}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PointCards.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      caption: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      directions: PropTypes.string,
      image: PropTypes.string
    })
  ).isRequired,
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

export default enhance(PointCards);
