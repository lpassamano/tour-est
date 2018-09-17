import React, { Component } from "react";
import PropTypes from "prop-types";
import { MediaObject, MediaObjectSection, Thumbnail } from "react-foundation";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import * as pointSelectors from "../redux/points/selectors";

export class PointDetails extends Component {
  render() {
    const { id, title, image, caption, description } = this.props.point;
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
                {description && <p>{description}</p>}
              </MediaObjectSection>
            </MediaObject>
          ) : (
            <div>
              {caption && <p>{caption}</p>}
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
  }).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  point: pointSelectors.getPoint(state, ownProps.pointId)
});

const enhance = connect(mapStateToProps);

export default enhance(PointDetails);
