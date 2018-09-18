import React, { Component } from "react";
import PropTypes from "prop-types";
import { MediaObject, MediaObjectSection, Thumbnail } from "react-foundation";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";

export class PointDetails extends Component {
  componentDidMount() {
    this.props.getPoint(this.props.tourId, this.props.pointId);
  }

  render() {
    const { isFetching, point } = this.props;

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
        </div>
      </div>
    );
  }
}

PointDetails.propTypes = {
  point: PropTypes.shape({
    title: PropTypes.string.isRequired,
    caption: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    directions: PropTypes.string,
    image: PropTypes.string
  }),
  isFetching: PropTypes.bool.isRequired,
  getPoint: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  point: pointSelectors.getPoint(state, ownProps.pointId),
  isFetching: pointSelectors.isFetching(state)
});

const mapDispatchToProps = {
  getPoint: pointActions.getPoint
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(PointDetails);
