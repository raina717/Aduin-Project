import axios from "axios";
import { failResponse, okResponse } from "utils/basicResponse";

const baseUrl = "http://localhost:8000/api/auth/v1/user";

const defaultConfig = {
  auth: {
    username: "aduinusernamedev",
    password: "28b4e7e6-cfb2-40b3-b2b2-5617ff75ac57",
  },
};

const login = async (payload) => {
  return axios
    .post(`${baseUrl}/login`, payload, defaultConfig)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const register = async (payload) => {
  return axios
    .post(`${baseUrl}/register`, payload, defaultConfig)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const resendVerifyEmail = async (payload) => {
  return axios
    .post(`${baseUrl}/resend-verify-email`, payload, defaultConfig)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const forgetPassword = async (payload) => {
  return axios
    .post(`${baseUrl}/forgot-password`, payload, defaultConfig)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const changePassword = async (payload) => {
  return axios
    .post(`${baseUrl}/update-password`, payload, defaultConfig)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const verifyEmail = async (payload) => {
  return axios
    .post(`${baseUrl}/verify-email`, payload, defaultConfig)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const userProfile = async () => {
  return axios
    .get(`${baseUrl}/profile`)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const updateProfile = async (payload) => {
  return axios
    .post(`${baseUrl}/profile`, payload)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const myNotification = async (params) => {
  let uri = `http://localhost:8000/api/auth/v1/notification/me`;

  if (Object.keys(params).length > 0) {
    uri += `?${new URLSearchParams(params).toString()}`;
  }

  return axios
    .get(uri)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const updateNotification = async (payload) => {
  let uri = `http://localhost:8000/api/auth/v1/notification`;

  return axios
    .put(uri, payload)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

export {
  login,
  register,
  verifyEmail,
  userProfile,
  updateProfile,
  forgetPassword,
  changePassword,
  resendVerifyEmail,
  myNotification,
  updateNotification,
};
