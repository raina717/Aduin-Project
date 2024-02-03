import axios from "axios";

// * Services
import * as authServices from "./auth.service";
import * as complainServices from "./complaint.service";
import * as adminServices from "./admin.service";

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("BEARER_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { authServices, complainServices, adminServices };
