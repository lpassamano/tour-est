import React, { Component } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import { Button } from "react-foundation";
import PropTypes from "prop-types";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";
import ImageInput from "./ImageInput";

const INITIAL_STATE = {
  title: "",
  caption: "",
  description: "",
  location: "",
  directions: "",
  image: undefined
};

export class AddPointForm extends Component {
  state = INITIAL_STATE;

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeImage = image => {
    this.setState({ image });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onCreatePoint(this.props.tourId, {
      point: this.state
    });

    if (event.target.type === "button") {
      return this.setState(INITIAL_STATE);
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
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="caption">Caption: </label>
        <textarea
          name="caption"
          type="text"
          value={this.state.caption}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="location">Location: </label>
        <input
          name="location"
          type="text"
          value={this.state.location}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="directions">Directions: </label>
        <textarea
          name="directions"
          type="text"
          value={this.state.directions}
          onChange={this.handleChange}
        />
        <br />
        <Button type="submit">Save</Button>
        <Button type="button" onClick={this.handleSubmit}>
          Save and add another
        </Button>
        <br />
        <Button className="hollow" type="button" onClick={this.props.onHide}>
          Cancel
        </Button>
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
