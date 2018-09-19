import React, { Component } from "react";
import PropTypes from "prop-types";
import { MediaObject, MediaObjectSection, Thumbnail } from "react-foundation";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";

export class PointDetails extends Component {
  componentDidMount() {
    this.props.listPoints(this.props.tourId);
  }

  render() {
    const { isFetching, point, tourId, nextPoint } = this.props;

    if (isFetching || !point) {
      return <p>loading... please wait!</p>;
    }

    const {
      id,
      title,
      image,
      caption,
      description,
      location,
      directions
    } = point;

    return (
      <div key={id}>
        <div className="media-object-basics-example">
          <h4>{title}</h4>
          {image ? (
            <MediaObject stackForSmall>
              <MediaObjectSection>
                <Thumbnail src={image} alt=" " width="150" />
              </MediaObjectSection>
              <MediaObjectSection isMain>
                {caption && <p>{caption}</p>}
                {location && <p>Location: {location}</p>}
                {directions && <p>How to get there: {directions}</p>}
                {description && <p>{description}</p>}
              </MediaObjectSection>
            </MediaObject>
          ) : (
            <div>
              {caption && <p>{caption}</p>}
              {location && <p>Location: {location}</p>}
              {directions && <p>How to get there: {directions}</p>}
              {description && <p>{description}</p>}
            </div>
          )}
          <hr />
          {nextPoint && (
            <Link to={`/tours/${tourId}/points/${nextPoint.id}`}>
              Next Point
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const pointProps = PropTypes.shape({
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  directions: PropTypes.string,
  image: PropTypes.string
});

PointDetails.propTypes = {
  point: pointProps,
  isFetching: PropTypes.bool.isRequired,
  listPoints: PropTypes.func.isRequired,
  nextPoint: pointProps
};

const mapStateToProps = (state, ownProps) => ({
  point: pointSelectors.getPoint(state, ownProps.pointId),
  isFetching: pointSelectors.isFetching(state),
  nextPoint: pointSelectors.getNextPoint(state, ownProps.pointId)
});

const mapDispatchToProps = {
  listPoints: pointActions.listPoints
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(PointDetails);
