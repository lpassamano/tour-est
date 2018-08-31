import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Point extends Component {
  render() {
    const { id, caption, image, image_url } = this.props.point;
    console.log(image);
    return (
      <div key={id}>
        <img src={image} alt="" />
        <h4>{caption}</h4>
      </div>
    );
  }
}

Point.propTypes = {
  point: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    image: PropTypes.object
  }).isRequired
};

// create get point method? to get all of the point data for the point passed down by props?
