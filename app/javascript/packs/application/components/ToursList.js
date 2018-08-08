import React, { Component } from "react";

class ToursList extends Component {
  render() {
    const { isFetching, data } = this.props.tours;
    if (isFetching || !data) {
      return <p>loading.... please wait!</p>;
    }

    return (
      <div>
        {this.props.tours.data.map(tour => <h4 key={tour.id}>{tour.title}</h4>)}
      </div>
    );
  }
}

//TODO: add proptypes
// stateless component
// add tourinfo back in here

export default ToursList;
