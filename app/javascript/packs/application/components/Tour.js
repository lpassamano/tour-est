import React, { Component } from "react";

class Tour extends Component {
  render() {
    const {
      title,
      starting_point,
      directions,
      estimated_time,
      description
    } = this.props.tour;

    return (
      <div>
        <h2>{title}</h2>
        <p>{estimated_time}</p>
        <p>description</p>
        <p>starting_point</p>
        <p>directions</p>
      </div>
    );
  }
}

export default Tour;
