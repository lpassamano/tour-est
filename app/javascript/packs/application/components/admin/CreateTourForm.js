import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TourFormFields from "./TourFormFields";
import * as tourActions from "../../redux/tours/actions";
import * as tourSelectors from "../../redux/tours/selectors";

export class CreateTourForm extends Component {
  handleSubmit = attributes => {
    this.props.onCreateTour({ tour: attributes });
  };

  render() {
    return <TourFormFields onSubmit={this.handleSubmit} />;
  }
}

CreateTourForm.propTypes = {
  onCreateTour: PropTypes.func.isRequired
};

const mapDispatchToProps = { onCreateTour: tourActions.createTour };
const enhance = connect(
  null,
  mapDispatchToProps
);

export default enhance(CreateTourForm);
