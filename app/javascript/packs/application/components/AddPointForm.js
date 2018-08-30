import React, { Component } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";
import ImageInput from "./ImageInput";

export class AddPointForm extends Component {
  state = {
    caption: "",
    image: null
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeImage = image => {
    this.setState({ image });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { caption } = this.state;
    this.props.onCreatePoint(this.props.tourId, {
      point: { caption: caption }
    });

    if (event.target.type === "button") {
      return this.setState({ caption: "" });
    }

    this.props.onHide();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="image">Upload Image</label>
        <ImageInput
          name="image"
          onChange={this.handleChangeImage}
          value={this.state.image}
        />
        <label htmlFor="caption">Caption: </label>
        <textarea
          name="caption"
          type="text"
          value={this.state.caption}
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={this.props.onHide}>
          Cancel
        </button>
        <button type="button" onClick={this.handleSubmit}>
          Save and add another point
        </button>
      </form>
    );
  }
}

AddPointForm.propTypes = {
  tourId: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onCreatePoint: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  tourId: ownProps.tourId,
  onHide: ownProps.onHide
});
const mapDispatchToProps = { onCreatePoint: pointActions.createPoint };

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(AddPointForm);
