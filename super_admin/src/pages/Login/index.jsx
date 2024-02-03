import axios from "axios";
import { Text } from "components";
import { LoadingAnimation } from "components/Loader";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Login = () => {
  const token = localStorage.getItem("BEARER_TOKEN");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      return navigate("/aduan", {
        replace: true,
      });
    } else {
      return fetchInitialize();
    }
  }, []);

  const fetchInitialize = async () => {
    const uri = "http://localhost:8000/api/auth/v1/user/profile";

    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${searchParams.get("token")}`,
      },
    });

    if (response.status) {
      if (response?.data?.success && response?.data?.data) {
        localStorage.setItem("BEARER_TOKEN", searchParams.get("token"));

        window.location.href = "http://localhost:3001/aduan";
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col space-x-4 justify-center items-center">
      <Text
        className="sm:text-[31.740000000000002px] md:text-[33.74px] text-[35.74px] text-indigo-A200 w-auto"
        size="txtPlusJakartaSansBold3574"
      >
        <span className="text-indigo-A200 font-poppins text-left font-bold">
          Adu
        </span>
        <span className="text-deep_orange-A200 font-poppins text-left font-bold">
          .
        </span>
        <span className="text-indigo-A200 font-poppins text-left font-bold">
          in
        </span>
      </Text>

      <LoadingAnimation />
    </div>
  );
};

export default Login;
