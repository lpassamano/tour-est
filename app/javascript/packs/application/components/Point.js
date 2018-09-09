import React, { Component } from "react";
import PropTypes from "prop-types";
import { MediaObject, MediaObjectSection, Thumbnail } from "react-foundation";
import { Link } from "@reach/router";
import UpdatePointForm from "./UpdatePointForm";

export class Point extends Component {
  state = {
    isEditing: false
  };

  showEditForm = () => {
    this.setState({ isEditing: true });
  };

  hideEditForm = () => {
    this.setState({ isEditing: false });
  };

  handleDeletePoint = event => {
    event.preventDefault();
    this.props.deletePoint(this.props.point.id);
  };

  render() {
    const { id, title, image, caption, description } = this.props.point;
    return (
      <div key={id}>
        {this.state.isEditing ? (
          <UpdatePointForm
            onHide={this.hideEditForm}
            pointId={id}
            tourId={this.props.tourId}
          />
        ) : (
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
            <Link to="#" onClick={this.showEditForm}>
              <i className="fi-pencil" /> Edit
            </Link>
            <Link to="#" onClick={this.handleDeletePoint}>
              <i className="fi-trash" /> Delete
            </Link>
            <hr />
          </div>
        )}
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
