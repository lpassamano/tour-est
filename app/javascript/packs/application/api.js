import { create } from "apisauce";

const getCSRFToken = () => {
  if (typeof jest !== "undefined") {
    return;
  }

  return document.querySelector("[name=csrf-token]").getAttribute("content");
};

const api = create({
  baseURL: "/",
  headers: {
    "x-csrf-token": getCSRFToken()
  }
});

const createStaffUser = attributes => {
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

const removeAuthToken = () => {
  window.localStorage.removeItem("token");
};

const createTour = attributes => {
  return api.post("/tours", attributes);
};

const listTours = () => {
  return api.get("/tours");
};

const getTour = tourId => {
  return api.get(`/tours/${tourId}`);
};

const createPoint = (tourId, attributes) => {
  return api.post(`/tours/${tourId}/points`, attributes);
};

const listPoints = tourId => {
  return api.get(`/tours/${tourId}/points`);
};

export default {
  createStaffUser,
  login,
  getStaffUser,
  authenticateStaffUser,
  removeAuthToken,
  createTour,
  listTours,
  getTour,
  createPoint,
  listPoints
};
