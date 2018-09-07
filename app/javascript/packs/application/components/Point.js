import React, { Component } from "react";
import PropTypes from "prop-types";
import { MediaObject, MediaObjectSection, Thumbnail } from "react-foundation";

export class Point extends Component {
  render() {
    const { id, title, image, caption, description } = this.props.point;
    return (
      <div key={id} className="media-object-basics-example">
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
