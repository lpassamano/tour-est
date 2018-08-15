import React, { Component } from "react";
import Tour from "./Tour";

class TourContainer extends Component {
  componentDidMount() {
    this.props.getTour(this.props.tourId);
  }

  render() {
    return (
      <div>
        <Tour tour={this.props.tour} />
      </div>
    );
  }
}

export default TourContainer;
