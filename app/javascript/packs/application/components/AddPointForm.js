import React, { Component } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as pointActions from "../redux/points/actions";
import * as pointSelectors from "../redux/points/selectors";

export class AddPointForm extends Component {
  state = {
    caption: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { caption } = this.state;
    this.props.onCreatePoint(this.props.tourId, {
      point: { caption: caption }
    });
    // if (result.ok) {
    //   this.setState({ caption: "" });
    //   this.props.onHide();
    // } else {
    //   console.error(result.error);
    // }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Upload Image (WIP)</p>
        <label htmlFor="caption">Caption: </label>
        <textarea
          name="caption"
          id="caption"
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
