import axios from "axios";
import { failResponse, okResponse } from "utils/basicResponse";

const baseUrl = "http://localhost:8000/api/auth/v1/user";

const listUser = async (params) => {
  let uri = `${baseUrl}/list-user`;

  if (Object.keys(params).length > 0) {
    uri += `?${new URLSearchParams(params).toString()}`;
  }

  return axios
    .get(uri)
    .then((res) => okResponse(res?.data))
    .catch((err) => failResponse(err));
};

const detailUser = async (id) => {
  let uri = `${baseUrl}/detail/admin/${id}`;

  return axios
    .get(uri)
    .then((res) => okResponse(res?.data))
    .catch((err) => failResponse(err));
};

const createAdmin = async (payload) => {
  let uri = `${baseUrl}/admin`;

  return axios
    .post(uri, payload)
    .then((res) => okResponse(res?.data))
    .catch((err) => failResponse(err));
};

const updateAdmin = async (payload) => {
  return axios
    .put(`${baseUrl}/admin`, payload)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

export { listUser, detailUser, createAdmin, updateAdmin };
