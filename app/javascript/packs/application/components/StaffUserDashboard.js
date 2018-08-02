import React, { Component } from "react";

class StaffUserDashboard extends Component {
  state = {
    username: "",
    id: "",
    cultural_center: {
      name: "",
      id: ""
    }
  };

  async componentDidMount() {
    const { ok, data } = await this.props.onAuthenticate();
    if (!ok) {
      throw new Error("Not Authenticated!");
    } else {
      this.setState({
        username: this.props.currentStaffUser.username,
        id: this.props.currentStaffUser.id,
        cultural_center: {
          name: this.props.currentStaffUser.cultural_center.name,
          id: this.props.currentStaffUser.cultural_center.id
        }
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Staff Dashboard</h1>
        <h3>Current user: {this.state.username}</h3>
        <h3>{this.state.cultural_center.name}</h3>
      </div>
    );
  }
}

export default StaffUserDashboard;
