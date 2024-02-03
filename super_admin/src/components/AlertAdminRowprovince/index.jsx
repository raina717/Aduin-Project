import React from "react";

import { Button, Img, Text } from "components";

const AlertAdminRowprovince = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col h-full items-start justify-center px-3 w-full">
          {props?.province}
        </div>
        <div className="flex flex-col h-full items-center justify-start px-3 w-full">
          <Text
            className="lowercase text-gray-900 text-xs w-auto"
            size="txtPoppinsRegular12"
          >
            {props?.email}
          </Text>
        </div>
        <div className="flex flex-col h-[52px] md:h-auto items-center justify-start px-3 w-[82px]">
          <Text
            className="text-gray-900 text-xs w-auto"
            size="txtPoppinsRegular12"
          >
            {props?.provinceOne}
          </Text>
        </div>
        <div className="flex flex-col h-[52px] md:h-auto items-center justify-start px-3 w-[82px]">
          <Button
            className="border border-green-500 border-solid cursor-pointer font-medium font-poppins leading-[normal] min-w-[50px] text-center text-xs"
            shape="round"
            color="gray_100"
            size="xs"
            variant="fill"
          >
            {props?.active}
          </Button>
        </div>
        <div className="flex flex-col h-[52px] md:h-auto items-center justify-start px-3 w-[130px]">
          <Text
            className="text-gray-900 text-xs w-auto"
            size="txtPoppinsRegular12"
          >
            {props?.provinceTwo}
          </Text>
        </div>
        <div className="flex flex-col h-[52px] md:h-auto items-center justify-start px-3 w-[131px]">
          <Text
            className="text-gray-900 text-xs w-auto"
            size="txtPoppinsRegular12"
          >
            {props?.provinceThree}
          </Text>
        </div>
        <Img
          className="h-full w-[85px]"
          src="images/img_frame543.svg"
          alt="frame543"
        />
      </div>
    </>
  );
};

AlertAdminRowprovince.defaultProps = {
  province: (
    <Text
      className="text-gray-900 text-xs underline uppercase w-full"
      size="txtPoppinsRegular12"
    >
      <span className="text-gray-900 font-poppins text-left font-normal">
        DRPD{" "}
      </span>
      <span className="text-gray-900 font-poppins text-left font-normal">
        Kabupaten
      </span>
      <span className="text-gray-900 font-poppins text-left font-normal">
        {" "}
        Bandung
      </span>
    </Text>
  ),
  email: "dprdkab.bandung@gmail.com",
  provinceOne: "Admin",
  active: "Active",
  provinceTwo: "01 Nov 2023, 15:30",
  provinceThree: "01 Nov 2023, 15:30",
};

export default AlertAdminRowprovince;
