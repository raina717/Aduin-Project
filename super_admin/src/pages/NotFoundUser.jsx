import { Text } from "components";
import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundUser = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center p-10">
      <div className="w-full flex space-x-10">
        <div className="flex-1 bg-gradient-to-l from-primary" />

        <Text size="" className="font-bold font-poppins text-3xl text-primary">
          401
        </Text>

        <div className="flex-1 bg-gradient-to-r from-primary" />
      </div>

      <Text
        size=""
        className="font-semibold font-poppins text-5xl mt-16 text-[#212121]"
      >
        User Unauthorized
      </Text>

      <Text size="" className="font-poppins text-[28px] text-[#616161] mt-10">
        Sorry, you're not allowed to access this page
      </Text>

      <div
        className="w-full mt-10 flex justify-center items-center
      "
      >
        <div>
          <button
            className="button-large bg-primary text-white-A700 font-semibold"
            onClick={() => {
              window.location.href = "http://localhost:3000/masuk";
            }}
          >
            Go Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundUser;
