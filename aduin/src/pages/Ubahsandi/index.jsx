import React from "react";

import { Button, Img, Input, Line, Text } from "components";
import Header from "components/Header";
import FooterPage from "components/Footer";

const UbahsandiPage = () => {
  return (
    <>
      <div className="flex flex-col font-plusjakartasans items-center justify-start mx-auto w-full">
        <div className="bg-gray-100 flex flex-col items-center justify-start w-full">
          <Header className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full" />
          <div className="flex flex-col font-poppins gap-8 items-start justify-start max-w-[873px] mt-[47px] mx-auto md:px-5 w-full">
            <Button
              className="cursor-pointer font-bold h-[50px] min-w-[188px] text-base text-center"
              shape="round"
              color="deep_orange_A200"
              size="md"
              variant="outline"
            >
              Kembali Ke Profil
            </Button>
            <div className="flex flex-col gap-1.5 items-start justify-start w-auto md:w-full">
              <div className="flex flex-col gap-4 items-start justify-start w-auto">
                <Text
                  className="capitalize md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-auto"
                  size="txtPoppinsSemiBold32"
                >
                  Ubah Data
                </Text>
                <div className="flex flex-row items-start justify-start w-auto">
                  <div className="flex flex-col items-start justify-start w-auto">
                    <div className="flex flex-col items-start justify-start px-3 py-1 w-auto">
                      <Text
                        className="capitalize text-gray-600 text-xl w-auto"
                        size="txtPoppinsRegular20"
                      >
                        Ubah Profil
                      </Text>
                    </div>
                  </div>
                  {/* <UbahProfileColumnvectortwentyone
                    className="flex flex-col items-start justify-start w-auto"
                    usertext="Ubah Kata Sandi"
                  /> */}
                </div>
              </div>
              <div className="bg-white-A700 border border-gray-300 border-solid flex flex-col gap-[33px] items-start justify-start max-w-[873px] px-4 py-6 rounded-[14px] w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-col gap-4 items-start justify-start w-full">
                      <div className="flex flex-col gap-1 items-start justify-center w-full">
                        <div className="flex flex-row gap-1 items-center justify-start w-auto">
                          <Text
                            className="text-gray-700 text-sm w-auto"
                            size="txtPoppinsRegular14Bluegray700"
                          >
                            Kata Sandi Lama
                          </Text>
                          <Text
                            className="text-red-600 text-sm w-auto"
                            size="txtPoppinsRegular14Red600"
                          >
                            *
                          </Text>
                        </div>
                        <Input
                          name="frameThree"
                          placeholder="Masukkan Kata Sandi Lama"
                          className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                          wrapClassName="border border-blue_gray-100_01 border-solid flex w-full"
                          suffix={
                            <Img
                              className="mt-px mb-auto h-6 ml-[35px]"
                              src="images/img_hide_icon.svg"
                              alt="Hide Icon"
                            />
                          }
                          shape="round"
                          color="white_A700"
                          size="md"
                          variant="fill"
                        ></Input>
                      </div>
                      <div className="flex flex-col gap-1 items-start justify-center w-full">
                        <div className="flex flex-row gap-1 items-center justify-start w-auto">
                          <Text
                            className="text-gray-700 text-sm w-auto"
                            size="txtPoppinsRegular14Bluegray700"
                          >
                            Kata Sandi Baru
                          </Text>
                          <Text
                            className="text-red-600 text-sm w-auto"
                            size="txtPoppinsRegular14Red600"
                          >
                            *
                          </Text>
                        </div>
                        <Input
                          name="frameThree_One"
                          placeholder="Masukkan Kata Sandi Baru"
                          className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                          wrapClassName="border border-blue_gray-100_01 border-solid flex w-full"
                          suffix={
                            <Img
                              className="mt-px mb-auto h-6 ml-[35px]"
                              src="images/img_hide_icon.svg"
                              alt="Hide Icon"
                            />
                          }
                          shape="round"
                          color="white_A700"
                          size="md"
                          variant="fill"
                        ></Input>
                      </div>
                      <div className="flex flex-col gap-1 items-start justify-center w-full">
                        <div className="flex flex-row gap-1 items-center justify-start w-auto">
                          <Text
                            className="text-gray-700 text-sm w-auto"
                            size="txtPoppinsRegular14Bluegray700"
                          >
                            Konfirmasi Kata Sandi Baru
                          </Text>
                          <Text
                            className="text-red-600 text-sm w-auto"
                            size="txtPoppinsRegular14Red600"
                          >
                            *
                          </Text>
                        </div>
                        <Input
                          name="frameThree_Two"
                          placeholder="Konfirmasi Kata Sandi Baru"
                          className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                          wrapClassName="border border-blue_gray-100_01 border-solid flex w-full"
                          suffix={
                            <Img
                              className="mt-px mb-auto h-6 ml-[35px]"
                              src="images/img_hide_icon.svg"
                              alt="Hide Icon"
                            />
                          }
                          shape="round"
                          color="white_A700"
                          size="md"
                          variant="fill"
                        ></Input>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="cursor-pointer font-bold h-[50px] min-w-[112px] text-base text-center"
                  shape="round"
                  color="deep_orange_A200"
                  size="md"
                  variant="fill"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
          <FooterPage/>
        </div>
      </div>
    </>
  );
};

export default UbahsandiPage;
