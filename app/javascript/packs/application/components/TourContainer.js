import React, { Component } from "react";
import Tour from "./Tour";
import AddPointForm from "./AddPointForm";

class TourContainer extends Component {
  state = {
    isShowingPointForm: false
  };

  async componentDidMount() {
    this.props.showTour(this.props.tourId);
  }

  showPointForm = () => {
    this.setState({ isShowingPointForm: true });
  };

  hidePointForm = () => {
    this.setState({ isShowingPointForm: false });
  };

  render() {
    // add in point views here
    // add in option to edit tour info here
    // add in option to edit points here
    return (
      <div>
        <Tour tour={this.props.tour} />

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
