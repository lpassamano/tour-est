import { create } from "apisauce";
import toFormData from "object-to-formdata";

export const getCSRFToken = () => {
  const meta = document.querySelector("[name=csrf-token]");
  return meta && meta.getAttribute("content");
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

const updateTour = attributes => {
  return api.patch(`/tours/${attributes.tour.id}`, attributes);
};

const listTours = () => {
  return api.get("/tours");
};

const getTour = tourId => {
  return api.get(`/tours/${tourId}`);
};

const deleteTour = tourId => {
  return api.delete(`/tours/${tourId}`);
};

const createPoint = (tourId, attributes) => {
  return api.post(`/tours/${tourId}/points`, toFormData(attributes));
};

const updatePoint = (tourId, attributes) => {
  return api.patch(
    `/tours/${tourId}/points/${attributes.point.id}`,
    toFormData(attributes)
  );
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
  updateTour,
  listTours,
  getTour,
  deleteTour,
  createPoint,
  updatePoint,
  listPoints
};
