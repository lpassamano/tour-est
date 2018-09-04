import React, { Component } from "react";
import PropTypes from "prop-types";

export class Point extends Component {
  render() {
    const { id, caption, image } = this.props.point;
    return (
      <div key={id}>
        <img src={image} alt="" width="150px" />
        <h4>{caption}</h4>
      </div>
    );
  }
}

Point.propTypes = {
  point: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    image: PropTypes.string
  }).isRequired
};

export default Point;
