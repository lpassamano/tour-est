import React, { Component } from "react";
import CreateTourForm from "./CreateTourForm";
import ToursList from "./ToursList";
import { connect } from "react-redux";
import { listTours } from "../redux/tours";

class StaffUserDashboard extends Component {
  componentDidMount() {
    this.props.listTours();
  }

  render() {
    const { username, id, cultural_center } = this.props.currentStaffUser;
    return (
      <div>
        <h1>Staff Dashboard</h1>
        <h3>Current user: {username}</h3>
        <h3>{cultural_center.name}</h3>
        <ToursList tours={this.props.tours} />
      </div>
    );
  }
}

// TODO: add proptypes
const mapStateToProps = state => ({
  tours: state.tours
});

const mapDispatchToProps = { listTours };
const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhance(StaffUserDashboard);
