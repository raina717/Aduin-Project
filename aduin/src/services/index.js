import axios from "axios";

// * Services
import * as authServices from "./auth.service";
import * as complainServices from "./complaint.service";

const defaultConfig = {
  auth: {
    username: "aduinusernamedev",
    password: "28b4e7e6-cfb2-40b3-b2b2-5617ff75ac57",
  },
};

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("BEARER_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.auth = defaultConfig.auth;
  }

  return config;
});

export { authServices, complainServices };
