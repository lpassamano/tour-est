import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import Tour from "./Tour";
import AddPointForm from "./AddPointForm";
import PointsList from "./PointsList";

export class TourContainer extends Component {
  state = {
    isShowingPointForm: false
  };

  showPointForm = () => {
    this.setState({ isShowingPointForm: true });
  };

  hidePointForm = () => {
    this.setState({ isShowingPointForm: false });
  };

  render() {
    return (
      <div>
        <Tour tourId={this.props.tourId} />
        <Link to={"edit"}>Edit Tour</Link>
        <PointsList tourId={this.props.tourId} />
        {this.state.isShowingPointForm ? (
          <AddPointForm
            onHide={this.hidePointForm}
            onShow={this.showPointForm}
            tourId={this.props.tourId}
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

TourContainer.propTypes = {
  tourId: PropTypes.string
};

export default TourContainer;
