import React, { Component } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
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

  handleSubmit = async event => {
    event.preventDefault();
    const { caption } = this.state;
    const result = await this.props.onCreatePoint(this.props.tourId, {
      point: { caption: caption }
    });

    if (result.ok) {
      this.setState({ caption: "" });
      this.props.onHide();
    } else {
      console.error(result.data.error);
    }
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
        <button type="submit" id="save">
          Save
        </button>
        <button type="button" onClick={this.props.onHide}>
          Cancel
        </button>
        <button type="button" id="save_and_add" onClick={this.handleSubmit}>
          Save and add another point
        </button>
      </form>
    );
  }
}

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
