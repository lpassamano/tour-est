import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

const getImagePreview = image => {
  if (image && image.preview) {
    return image.preview;
  }

  return image;
};

const style = {
  border: "1px dashed #98a1a8",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer"
};

const activeStyle = {
  ...style,
  background: "#fff6cd",
  cursor: "grabbing"
};

const config = {
  style,
  activeStyle,
  className: "dropzone"
};

export default class ImageInput extends Component {
  handleChange = ([image]) => {
    this.props.onChange(image);
  };

  render() {
    const { name, value } = this.props;
    const preview = getImagePreview(value);

    return (
      <Dropzone name={name} onDrop={this.handleChange} {...config}>
        {preview && <img src={preview} />}

        <p>Drag and drop your image here.</p>
      </Dropzone>
    );
  }
}

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ preview: PropTypes.string })
  ])
};
