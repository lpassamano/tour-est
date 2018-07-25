import { create } from 'apisauce'

const api = create({
  baseURL: '/',
  headers: { 'x-csrf-token': document.querySelector("[name=csrf-token]").getAttribute("content") }
})

const login = async (username, password) => {
  const result = await api.post("/sessions", { username, password })
  if (result.ok) {
    setAuthToken(result.data.token)
  }
  return result
}

const getStaffUser = () => {
  return api.get('/staff_user')
}

const setAuthToken = (token) => {
  api.setHeader('Authorization', `Token token="${token}"`);
  window.localStorage.setItem('token', token)
}


export default {
  login,
  getStaffUser
}
