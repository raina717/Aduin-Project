import axios from "axios";
import { failResponse, okResponse } from "utils/basicResponse";

const baseUrl = "http://localhost:8003/api/complaints/v1/complaint";

const allComplaint = async (params) => {
  let uri = baseUrl;

  if (Object.keys(params).length > 0) {
    uri += `?${new URLSearchParams(params).toString()}`;
  }

  return axios
    .get(uri)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const allCategories = async () => {
  return axios
    .get(`${baseUrl}/categories`)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const detailComplaint = async (id) => {
  return axios
    .get(`${baseUrl}/${id}`)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const addComplain = async (payload) => {
  return axios
    .post(baseUrl, payload)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const addComment = async (payload) => {
  return axios
    .post(`${baseUrl}/comment`, payload)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const addResponse = async (payload) => {
  return axios
    .post(`${baseUrl}/response`, payload)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const addLike = async (id) => {
  return axios
    .put(`${baseUrl}/like/${id}`)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const countShare = async (id) => {
  return axios
    .put(`${baseUrl}/share/${id}`)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const uploadEvidence = async (payload) => {
  const url = "http://localhost:8003/api/complaints/storage/upload";

  const postData = new FormData();

  Object.entries(payload).map((item) => postData.append(item[0], item[1]));

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return axios
    .post(url, postData, config)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

const getEvidence = async (id, location) => {
  const url = `http://localhost/storage/evidences/${id}/${location}`;

  return axios
    .get(url)
    .then((res) => okResponse(res.data))
    .catch((err) => failResponse(err));
};

export {
  allComplaint,
  allCategories,
  detailComplaint,
  addComplain,
  addComment,
  addResponse,
  addLike,
  countShare,
  getEvidence,
  uploadEvidence,
};
