import React, { Component } from 'react'

class StaffUserDashboard extends Component {
  state = {
    username: "",
    id: "",
    cultural_center: {
      name: "",
      id: ""
  }}

  async componentDidMount() {
    const { ok, data } = await this.props.onAuthenticate();
    if (!ok) {
      throw new Error('Not Authenticated!');
    }
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
