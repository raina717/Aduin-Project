import React from "react";
import { Img, Text } from "components";

const FooterPage = () => {
  return (
    <div className="bg-white-A700 flex flex-col font-poppins items-start justify-start mt-[103px] p-[24px] w-full">
      <div className="flex md:flex-col flex-row md:gap-10 gap-[159px] items-start justify-between max-w-[1046px] mb-[54px] mx-auto md:px-5 w-full">
        <div className="flex sm:flex-1 flex-col gap-[18px] items-start justify-start w-auto sm:w-full">
          <Text
            className="sm:text-[39.54px] md:text-[45.54px] text-[49.54px] text-black-900 w-auto"
            size="txtPoppinsBold4954"
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
          <Text
            className="max-w-[456px] md:max-w-full text-gray-500 text-sm"
            size="txtPoppinsRegular14Bluegray200"
          >
            Adu.in adalah sebuah inovatif platform yang dirancang untuk
            memberikan kemudahan dalam mengadukan dan melaporkan berbagai jenis
            kejadian ke pihak berwenang hingga institusi pemerintahan dalam
            bentuk social network.
          </Text>
          <Text
            className="text-gray-600 text-sm w-auto"
            size="txtPoppinsRegular14Bluegray400"
          >
            Copyright 2023. Adu.in. All Right Reserved{" "}
          </Text>
        </div>
        <div className="flex flex-col gap-2 pt-4 items-start justify-start w-auto">
          <Text
            className="text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto"
            size="txtPoppinsSemiBold24"
          >
            Menu
          </Text>
          <Text
            className="text-gray-500 text-sm w-auto"
            size="txtPoppinsRegular14Bluegray200"
          >
            Beranda
          </Text>
          <Text
            className="text-gray-500 text-sm w-auto"
            size="txtPoppinsRegular14Bluegray200"
          >
            Aduan Saya
          </Text>
          <Text
            className="text-gray-500 text-sm w-auto"
            size="txtPoppinsRegular14Bluegray200"
          >
            Tentang Kami
          </Text>
        </div>
        <div className="flex flex-col gap-3 pt-4 items-start justify-start w-auto">
          <Text
            className="text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto"
            size="txtPoppinsSemiBold24"
          >
            Hubungi Kami
          </Text>
          <Text
            className="text-gray-500 text-sm w-auto"
            size="txtPoppinsRegular14Bluegray200"
          >
            Email : Contact@adu.in
          </Text>
          <Img
            className="h-10 w-[136px]"
            src="images/img_frame2608943.svg"
            alt="frame2608943"
          />
        </div>
      </div>
    </div>
  );
};
export default FooterPage;
