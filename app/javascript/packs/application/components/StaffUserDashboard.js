import React, { Component } from 'react'
import api from '../api'

class StaffUserDashboard extends Component {
  state = {
    username: "",
    id: "",
    cultural_center: {
      name: "",
      id: ""
  }}

  async componentDidMount() {
    const { ok, data } = await api.authenticateStaffUser();

    if (!ok) {
      throw new Error('Not Authenticated!');
    }

    console.log('user is', data);
  }

  render() {
    return (
      <div>
        Staff Dashboard
      </div>
    )
  }
}

export default StaffUserDashboard;
