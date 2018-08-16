import React, { Component } from "react";
import Tour from "./Tour";
import AddPointForm from "./AddPointForm";
import PointsList from "./PointsList";
import { connect } from "react-redux";
import { listPoints } from "../redux/points";

export class TourContainer extends Component {
  state = {
    isShowingPointForm: false
  };

  componentDidMount() {
    this.props.getTour(this.props.tourId);
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
        <Tour tour={this.props.tour.data} />
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

// todo: add prop types

const mapStateToProps = state => ({
  points: state.points
});

const mapDispatchToProps = { listPoints };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(TourContainer);
