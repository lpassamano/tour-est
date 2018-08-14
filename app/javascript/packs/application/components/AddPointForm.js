import React, { Component } from "react";

// const AddPointForm = props => (
//   <div>
//     <p>Upload Image (WIP)</p>
//     <label htmlFor="caption">Caption: </label>
//     <textarea
//       name="caption"
//       id="caption"
//       type="text"
//       onChange={props.onChange}
//     />
//   </div>
// );

class AddPointForm extends Component {
  // TODO: add additional point fields
  state = {
    caption: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.props.handlePointChange(this.state, this.props.index);
  };

  render() {
    // return form fields only for a point
    // div w/
    // state is stored here and passed to parent component?
    // which means handleChange also needs to happen there??
    return (
      <div id={this.props.index}>
        <p>Upload Image (WIP)</p>
        <label htmlFor="caption">Caption: </label>
        <textarea
          name="caption"
          id="caption"
          type="text"
          value={this.state.caption}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default AddPointForm;
