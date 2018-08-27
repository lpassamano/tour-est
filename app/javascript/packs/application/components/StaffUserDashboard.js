import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CreateTourForm from "./CreateTourForm";
import ToursList from "./ToursList";
import * as staffUserSelectors from "../redux/staffUser/selectors";

export class StaffUserDashboard extends Component {
  render() {
    const { username, id, cultural_center } = this.props.currentStaffUser;
    return (
      <div>
        <h1>Staff Dashboard</h1>
        <h3>Current user: {username}</h3>
        <h3>{cultural_center.name}</h3>
        <ToursList />
      </div>
    );
  }
}

StaffUserDashboard.propTypes = {
  currentStaffUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    cultural_center: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  currentStaffUser: staffUserSelectors.getStaffUser(state)
});

const enhance = connect(mapStateToProps);

export default enhance(StaffUserDashboard);
