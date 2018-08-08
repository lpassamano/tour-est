import React, { Component } from "react";
import CreateTourForm from "./CreateTourForm";

class StaffUserDashboard extends Component {
  async componentDidMount() {
    const { ok, data } = await this.props.onAuthenticate();

    if (!ok) {
      throw new Error("Not Authenticated!");
    }
  }

  render() {
    const { username, cultural_center, id } = this.props.currentStaffUser;
    return (
      <div>
        <h1>Staff Dashboard</h1>
        <h3>Current user: {username}</h3>
        <h3>{cultural_center.name}</h3>
        <CreateTourForm
          onCreateTour={this.props.onCreateTour}
          staffUserId={id}
          culturalCenterId={cultural_center.id}
        />
      </div>
    );
  }
}

// TODO: add proptypes

export default StaffUserDashboard;
