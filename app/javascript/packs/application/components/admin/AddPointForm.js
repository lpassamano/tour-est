import React, { Component } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PointFormFields from "./PointFormFields";
import * as pointActions from "../../redux/points/actions";
import * as pointSelectors from "../../redux/points/selectors";

export class AddPointForm extends Component {
  handleSubmit = attributes => {
    this.props.onCreatePoint(this.props.tourId, {
      point: attributes
    });
  };

  render() {
    return (
      <PointFormFields
        onSubmit={this.handleSubmit}
        onHide={this.props.onHide}
      />
    );
  }
}

AddPointForm.propTypes = {
  tourId: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onCreatePoint: PropTypes.func.isRequired
};

const mapDispatchToProps = { onCreatePoint: pointActions.createPoint };

const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(AddPointForm);
