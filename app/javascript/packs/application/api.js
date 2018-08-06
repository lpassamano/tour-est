import { create } from "apisauce";

const api = create({
  baseURL: "/",
  headers: {
    "x-csrf-token": document
      .querySelector("[name=csrf-token]")
      .getAttribute("content")
  }
});

const createStaffUser = async attributes => {
  return api.post("/staff_users", attributes);
};

const login = async (username, password) => {
  const result = await api.post("/sessions", { username, password });
  if (result.ok) {
    setAuthToken(result.data.token);
  }
  return result;
};

const getStaffUser = () => {
  return api.get("/staff_user");
};

const authenticateStaffUser = () => {
  const token = window.localStorage.getItem("token");
  api.setHeader("Authorization", `Token token="${token}"`);
  return getStaffUser();
};

const setAuthToken = token => {
  api.setHeader("Authorization", `Token token="${token}"`);
  window.localStorage.setItem("token", token);
};

const createTour = async attributes => {
  // only allowed to do if currentStaffUser
  return api.post("/tours", attributes);
};

export default {
  createStaffUser,
  login,
  getStaffUser,
  authenticateStaffUser,
  createTour
};
