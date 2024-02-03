import React from "react";

import { Menu, MenuItem } from "react-pro-sidebar";

import { Button, Img, Input, Radio, RadioGroup, Text } from "components";
import Sidebar1 from "components/Sidebar1";
import UbahPenggunaStateinput from "components/UbahPenggunaStateinput";

const UbahPenggunaPage = () => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-5 items-start justify-evenly w-full">
          <Sidebar1 className="!sticky !w-[250px] bg-white-A700 border-gray-300 border-r border-solid flex h-screen md:hidden justify-start overflow-auto md:px-5 top-[0]" />
          <div className="flex flex-1 flex-col gap-1.5 items-center justify-start md:px-5 w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="bg-white-A700 border-b border-gray-200 border-solid flex flex-col items-center justify-between p-6 sm:px-5 w-full">
                <header className="flex sm:flex-col flex-row md:gap-6 items-center justify-between w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-auto">
                    <Text
                      className="text-base text-indigo-A200 w-auto"
                      size="txtPoppinsSemiBold16IndigoA200"
                    >
                      Pengguna
                    </Text>
                    <Img
                      className="h-6 w-6"
                      src="images/img_arrowright.svg"
                      alt="arrowright"
                    />
                    <Text
                      className="text-base text-gray-500 w-auto"
                      size="txtPoppinsRegular16"
                    >
                      Andre Vijaya
                    </Text>
                  </div>
                  <div className="flex flex-col items-center justify-end w-auto">
                    <div className="flex flex-row gap-2 items-start justify-start w-auto">
                      <Button
                        className="border border-gray-400 border-solid flex h-12 items-center justify-center w-12"
                        shape="circle"
                        color="indigo_50"
                        size="sm"
                        variant="fill"
                      >
                        <Img
                          className="h-8"
                          src="images/img_phuser.svg"
                          alt="phuser"
                        />
                      </Button>
                      <div className="flex flex-col gap-[-5px] h-12 md:h-auto items-start justify-between">
                        <Text
                          className="text-base text-gray-800 underline w-auto"
                          size="txtPoppinsMedium16Bluegray900"
                        >
                          Joseph Cornelius
                        </Text>
                        <Text
                          className="text-gray-600 text-sm w-auto"
                          size="txtPoppinsRegular14"
                        >
                          SuperAdmin
                        </Text>
                      </div>
                    </div>
                  </div>
                </header>
              </div>
              <div className="bg-gray-300 flex md:flex-col flex-row md:gap-10 items-center justify-between px-4 py-3 w-full">
                <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                  <Img
                    className="h-8 w-8"
                    src="images/img_arrowleft.svg"
                    alt="arrowleft"
                  />
                  <Text
                    className="text-gray-900 text-xl tracking-[-0.20px] w-auto"
                    size="txtPoppinsSemiBold20"
                  >
                    Andre Vijaya
                  </Text>
                </div>
                <div className="flex flex-row gap-6 items-center justify-start w-auto">
                  <Button
                    className="border border-gray-400 border-solid cursor-pointer font-bold min-w-[123px] rounded-lg text-base text-center"
                    color="white_A700"
                    size="md"
                    variant="fill"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer font-bold min-w-[105px] rounded-lg text-base text-center"
                    color="deep_orange_A200"
                    size="md"
                    variant="fill"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col gap-4 items-start justify-start max-w-[1148px] p-6 sm:px-5 rounded w-full">
              <Text
                className="capitalize text-gray-900 text-xl w-auto"
                size="txtPoppinsMedium20"
              >
                Informasi Pengguna
              </Text>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-col gap-2 items-start justify-center w-full">
                  <Text
                    className="text-blue_gray-800 text-sm w-auto"
                    size="txtPoppinsRegular14Bluegray800"
                  >
                    Foto Profil
                  </Text>
                  <div className="flex flex-col items-center justify-start w-[123px]">
                    <div className="bg-gray-300 border border-gray-400 border-solid flex flex-col h-[123px] items-center justify-end p-5 rounded-[61px] w-[123px]">
                      <Img
                        className="h-[82px] w-[82px]"
                        src="images/img_phuser.svg"
                        alt="phuser_One"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full">
                  <UbahPenggunaStateinput className="flex flex-1 flex-col items-start justify-start w-full" />
                  <div className="flex flex-1 flex-col gap-3 h-full items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-gray-700 text-sm w-auto"
                        size="txtPoppinsRegular14Bluegray700"
                      >
                        Email
                      </Text>
                    </div>
                    <Text
                      className="text-base text-gray-900 w-52"
                      size="txtPoppinsRegular16Gray90001"
                    >
                      andre_vijaya@gmail.com
                    </Text>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full">
                  <div className="flex flex-1 flex-col gap-3 h-full items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-gray-700 text-sm w-auto"
                        size="txtPoppinsRegular14Bluegray700"
                      >
                        Nama
                      </Text>
                    </div>
                    <Text
                      className="text-base text-gray-900 w-[101px]"
                      size="txtPoppinsRegular16Gray90001"
                    >
                      Andre Vijaya
                    </Text>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 h-full items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-gray-700 text-sm w-auto"
                        size="txtPoppinsRegular14Bluegray700"
                      >
                        Email
                      </Text>
                    </div>
                    <Text
                      className="text-base text-gray-900 w-52"
                      size="txtPoppinsRegular16Gray90001"
                    >
                      andre_vijaya@gmail.com
                    </Text>
                  </div>
                </div>
                <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full">
                 
                </div>
                <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full">
                  <div className="flex flex-1 flex-col gap-3 h-full items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-gray-700 text-sm w-auto"
                        size="txtPoppinsRegular14Bluegray700"
                      >
                        No Whatsapp
                      </Text>
                    </div>
                    <Text
                      className="text-base text-gray-900 w-[133px]"
                      size="txtPoppinsRegular16Gray90001"
                    >
                      +6281234567890
                    </Text>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 h-full items-start justify-start w-full">
                    <div className="flex flex-col items-center justify-start w-auto">
                      <Text
                        className="text-gray-700 text-sm w-auto"
                        size="txtPoppinsRegular14Bluegray700"
                      >
                        Alamat
                      </Text>
                    </div>
                    <Text
                      className="leading-[22.00px] max-w-[538px] md:max-w-full text-base text-gray-900"
                      size="txtPoppinsRegular16Gray90001"
                    >
                      Jl. Proklamasi No.10, RT.10/RW.2, Pegangsaan, Kec.
                      Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta
                      10320
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-center w-full">
                  <div className="flex flex-row gap-1 items-center justify-start w-auto">
                    <Text
                      className="text-gray-700 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray700"
                    >
                      Status
                    </Text>
                    <Text
                      className="text-red-600 text-sm w-auto"
                      size="txtPoppinsRegular14Red600"
                    >
                      *
                    </Text>
                  </div>
                  <RadioGroup
                    className="flex gap-4 items-center justify-start w-auto"
                    name="radiogroupactive"
                  >
                    <Radio
                      value="Active"
                      className="text-base text-blue_gray-500 text-left"
                      inputClassName="mr-[5px]"
                      checked={false}
                      name="radiogroupactive"
                      label="Active"
                      id="Active"
                    ></Radio>
                    <Radio
                      value="Inactive"
                      className="text-base text-blue_gray-500 text-left"
                      inputClassName="mr-[5px]"
                      checked={false}
                      name="radiogroupactive"
                      label="Inactive"
                      id="Inactive"
                    ></Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UbahPenggunaPage;
