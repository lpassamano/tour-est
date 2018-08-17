import React, { Component } from "react";
import Tour from "./Tour";
import AddPointForm from "./AddPointForm";
import PointsList from "./PointsList";

class TourContainer extends Component {
  state = {
    isShowingPointForm: false
  };

  async componentDidMount() {
    console.log("tour id", this.props.tourId);
    this.props.showTour(this.props.tourId);
    this.props.listPoints(this.props.tourId);
  }

  showPointForm = () => {
    this.setState({ isShowingPointForm: true });
  };

  hidePointForm = () => {
    this.setState({ isShowingPointForm: false });
  };

  render() {
    return (
      <div>
        <Tour tour={this.props.tour} />
        <PointsList points={this.props.points} />
        {this.state.isShowingPointForm ? (
          <AddPointForm
            onHide={this.hidePointForm}
            onShow={this.showPointForm}
            onCreatePoint={this.props.onCreatePoint}
          />
        ) : (
          <button type="button" onClick={this.showPointForm}>
            Add Point to Tour
          </button>
        )}
      </div>
    );
  }
}

export default TourContainer;
