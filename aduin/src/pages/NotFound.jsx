import { Text } from "components";
import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center p-10">
      <div className="w-full flex space-x-10">
        <div className="flex-1 bg-gradient-to-l from-primary" />

        <Text size="" className="font-bold font-poppins text-3xl text-primary">
          404
        </Text>

        <div className="flex-1 bg-gradient-to-r from-primary" />
      </div>

      <Text
        size=""
        className="font-semibold font-poppins text-5xl mt-16 text-[#212121]"
      >
        Page Not Found
      </Text>

      <Text size="" className="font-poppins text-[28px] text-[#616161] mt-10">
        Sorry we could not find the page
      </Text>

      <div
        className="w-full mt-10 flex justify-center items-center
      "
      >
        <div>
          <NavLink to="/" replace>
            <button className="button-large bg-primary text-white-A700_01 font-semibold">
              Go Home Dashboard
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
