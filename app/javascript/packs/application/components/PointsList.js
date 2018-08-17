import React, { Component } from "react";

class PointsList extends Component {
  render() {
    console.log(this.props.points);
    const { isFetching, data } = this.props.points;
    if (isFetching) {
      return <p>loading... please wait!</p>;
    }

    if (!data) {
      return <p>Add points to your tour by clicking the button below!</p>;
    }

    return (
      <div>
        {this.props.points.data.map(point => (
          <h4 key={point.id}>{point.caption}</h4>
        ))}
      </div>
    );
  }
}

export default PointsList;
