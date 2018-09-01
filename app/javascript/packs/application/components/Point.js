import React, { Component } from "react";
import PropTypes from "prop-types";

export class Point extends Component {
  render() {
    const { id, title, image } = this.props.point;
    return (
      <div key={id}>
        <img src={image} alt="" width="150px" />
        <h4>{title}</h4>
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
    directins: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

export default Point;
