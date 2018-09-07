import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { connect } from "react-redux";
import Tour from "./Tour";
import AddPointForm from "./AddPointForm";
import PointsList from "./PointsList";
import * as tourActions from "../redux/tours/actions";

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

  handleDeleteTour = event => {
    event.preventDefault();
    this.props.deleteTour(this.props.tourId);
  };

  render() {
    return (
      <div>
        <Tour tourId={this.props.tourId} />
        {this.state.isShowingPointForm ? (
          <AddPointForm
            onHide={this.hidePointForm}
            onShow={this.showPointForm}
            tourId={this.props.tourId}
          />
        ) : (
          <div>
            <Link to={`/tours/${this.props.tourId}/edit`}>
              <i className="fi-pencil" /> Edit
            </Link>
            <Link to="#" onClick={this.handleDeleteTour}>
              <i className="fi-trash" /> Delete
            </Link>
            <br />
            <button
              className="button hollow"
              type="button"
              onClick={this.showPointForm}
            >
              Add Point to Tour
            </button>
          </div>
        )}
        <div>
          <h3>Points on Tour</h3>
          <PointsList tourId={this.props.tourId} />
        </div>
      </div>
    );
  }
}

TourContainer.propTypes = {
  tourId: PropTypes.string,
  deleteTour: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteTour: tourActions.deleteTour
};

const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(TourContainer);
