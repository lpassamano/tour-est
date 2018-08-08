import React, { Component } from "react";

class TourInfo extends Component {
  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
      </div>
    );
  }
}

//TODO: add proptypes
// add back into tourlist component

export default TourInfo;
