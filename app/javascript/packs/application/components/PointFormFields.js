import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-foundation";
import ImageInput from "./ImageInput";

const INITIAL_STATE = {
  title: "",
  caption: "",
  description: "",
  location: "",
  directions: "",
  image: undefined,
  imageEdited: false
};

export class PointFormFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      ...this.props.initialValues
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);

    if (event.target.type === "button") {
      return this.setState(INITIAL_STATE);
    }

    this.props.onHide();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeImage = image => {
    this.setState({
      image: image,
      imageEdited: true
    });
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

PointFormFields.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    caption: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    directions: PropTypes.string,
    image: PropTypes.string
  })
};

PointFormFields.defaultProps = {
  initialValues: {}
};

export default PointFormFields;
