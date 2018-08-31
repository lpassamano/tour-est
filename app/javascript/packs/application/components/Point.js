import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Point extends Component {
  render() {
    const { id, title, image } = this.props.point;
    return (
      <div key={id}>
        <img src={image} alt="" />
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
