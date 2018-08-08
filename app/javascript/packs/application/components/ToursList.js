import React, { Component } from "react";
import TourInfo from "./TourInfo";

class ToursList extends Component {
  tours = tours => {
    return tours.map(tour => <TourInfo key={tour.id} title={tour.title} />);
  };

  render() {
    const tourlist = this.tours(this.props.tours);
    return <div>{tourlist}</div>;
  }
}

//TODO: add proptypes

export default ToursList;
