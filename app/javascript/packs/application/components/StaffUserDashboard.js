import React, { Component } from 'react'
import { create } from 'apisauce'

const api = create({
  baseURL: '/'
})

class StaffUserDashboard extends Component {
  state = {
    username: "",
    id: "",
    cultural_center: {
      name: "",
      id: ""
  }}

  async componentDidMount() {
    const token = window.localStorage.getItem('token');
    api.setHeader('Authorization', `Token token="${token}"`);
    const { ok, data } = await api.get('/staff_user');

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
