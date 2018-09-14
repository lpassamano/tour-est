import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PointFormFields from "./PointFormFields";
import * as pointActions from "../../redux/points/actions";
import * as pointSelectors from "../../redux/points/selectors";

export class UpdatePointForm extends Component {
  handleSubmit = attributes => {
    this.props.onUpdatePoint(this.props.tourId, { point: attributes });
  };

  render() {
    return (
      <PointFormFields
        onSubmit={this.handleSubmit}
        onHide={this.props.onHide}
        initialValues={this.props.point}
      />
    );
  }
}

UpdatePointForm.propTypes = {
  onHide: PropTypes.func.isRequired,
  onUpdatePoint: PropTypes.func.isRequired,
  tourId: PropTypes.string.isRequired,
  point: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    caption: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    directions: PropTypes.string,
    image: PropTypes.string
  }).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  point: pointSelectors.getPoint(state, ownProps.pointId)
});

const mapDispatchToProps = { onUpdatePoint: pointActions.updatePoint };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(UpdatePointForm);
