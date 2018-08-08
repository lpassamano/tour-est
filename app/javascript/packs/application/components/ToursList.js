import React, { Component } from "react";
import TourInfo from "./TourInfo";

class ToursList extends Component {
  render() {
    const { isFetching, data } = this.props.tours;
    if (isFetching || !data) {
      return <p>loading.... please wait!</p>;
    }

    return (
      <div>
        {this.props.tours.data.map(tour => (
          <TourInfo key={tour.id} title={tour.title} />
        ))}
      </div>
    );
  }
}

//TODO: add proptypes
// stateless component
// add tourinfo back in here

export default ToursList;
