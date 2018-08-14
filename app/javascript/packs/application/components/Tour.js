import React, { Component } from "react";

class Tour extends Component {
  // make stateless component

  render() {
    if (!this.props.tour) {
      return <p>loading... please wait!</p>;
    }

    return (
      <div>
        <h2>{this.props.tour.title}</h2>
        <p>{this.props.tour.estimated_time}</p>
        <p>{this.props.tour.description}</p>
        <p>{this.props.tour.starting_point}</p>
        <p>{this.props.tour.directions}</p>
      </div>
    );
  }
}

export default Tour;
