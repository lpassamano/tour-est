import React, { Component } from "react";
import PropTypes from "prop-types";
import { MediaObject, MediaObjectSection, Thumbnail } from "react-foundation";

export class Point extends Component {
  render() {
    const { id, title, image } = this.props.point;
    return (
      <div key={id} className="media-object-basics-example">
        <MediaObject>
          {image ? (
            <MediaObjectSection>
              <Thumbnail src={image} alt=" " />
            </MediaObjectSection>
          ) : null}
          <MediaObjectSection isMain>
            <h4>{title}</h4>
          </MediaObjectSection>
        </MediaObject>
      </div>
    );
  }
}

Point.propTypes = {
  point: PropTypes.shape({
    title: PropTypes.string.isRequired,
    caption: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    directions: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default Point;
