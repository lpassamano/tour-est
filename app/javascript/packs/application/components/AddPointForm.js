import React, { Component } from "react";

const AddPointForm = props => (
  <div>
    <p>Upload Image (WIP)</p>
    <label htmlFor="caption">Caption: </label>
    <textarea name="caption" id="caption" type="text" />
  </div>
);

// class AddPointForm extends Component {
//   render() {
//     // return form fields only for a point
//     // div w/
//     // state is stored here and passed to parent component?
//     // which means handleChange also needs to happen there??
//     return (
//       <div>
//         <p>Upload Image (WIP)</p>
//         <label htmlFor="caption">Caption: </label>
//         <textarea
//           name="caption"
//           id="caption"
//           type="text"
//         />
//       </div>
//     )
//   }
// }

export default AddPointForm;
