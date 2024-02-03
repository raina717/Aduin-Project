import { Text } from "components";
import { LoadingAnimation } from "components/Loader";
import React from "react";

const WaitingPage = () => {
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

export default WaitingPage;
