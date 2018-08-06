import React, { Component } from "react";
import CreateTourForm from "./CreateTourForm";

class StaffUserDashboard extends Component {
  async componentDidMount() {
    const { ok, data } = await this.props.onAuthenticate();
    if (!ok) {
      throw new Error("Not Authenticated!");
<<<<<<< HEAD
=======
    } else {
      this.setState({
        username: this.props.currentStaffUser.username,
        id: this.props.currentStaffUser.id,
        cultural_center: {
          name: this.props.currentStaffUser.cultural_center.name,
          // not recieving cc id in the props!!
          id: this.props.currentStaffUser.cultural_center.id
        }
      });
>>>>>>> Add snapshot test
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

export default StaffUserDashboard;
