import React from "react";

import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Button, Img, Input, Text } from "components";

const TambahAdminPage = () => {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <>
      <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="bg-gray-100 flex flex-col items-center justify-start w-full">
          <div className="flex md:flex-col flex-row md:gap-5 items-start justify-evenly w-full">
            <Sidebar
              onClick={() => collapseSidebar(!collapsed)}
              className="!sticky !w-[250px] bg-white-A700 border-gray-300 border-r border-solid flex h-screen md:hidden justify-start overflow-auto md:px-5 top-[0]"
            >
              <Text
                className="md:ml-[0] ml-[26px] mr-[104px] mt-[42px] sm:text-[31.740000000000002px] md:text-[33.74px] text-[35.74px] text-indigo-A200 w-auto"
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
              <Text
                className="capitalize flex-1 ml-4 md:ml-[0] mr-[187px] mt-[41px] text-base text-gray-500 tracking-[1.60px] w-auto"
                size="txtPoppinsSemiBold16"
              >
                MAIN
              </Text>
              <Menu
                menuItemStyles={{
                  button: {
                    padding: "10px",
                    gap: "6px",
                    color: "#718096",
                    fontWeight: 500,
                    fontSize: "16px",
                    borderRadius: "4px",
                    [`&:hover, &.ps-active`]: {
                      color: "#4475f2",
                      fontWeight: "600 !important",
                      backgroundColor: "#edf2feff !important",
                    },
                  },
                }}
                className="flex flex-col font-poppins items-center justify-start mb-[624px] mt-[15px] pt-3 px-4 w-[88%]"
              >
                <div className="flex flex-col items-center justify-start w-full">
                  <MenuItem
                    icon={
                      <Img
                        className="h-6 w-6"
                        src="images/img_mdifileoutline.svg"
                        alt="mdifileoutline"
                      />
                    }
                    active={window.location.pathname === "/daftaraduan"}
                    href="/daftaraduan"
                  >
                    <Text className="flex-1 my-0.5 w-auto">Daftar Aduan</Text>
                  </MenuItem>
                  <MenuItem
                    icon={
                      <Img
                        className="h-6 w-6"
                        src="images/img_mdibelloutline.svg"
                        alt="mdibelloutline"
                      />
                    }
                  >
                    <Text className="flex-1 my-0.5 w-auto">Notifikasi</Text>
                  </MenuItem>
                </div>
                <Text
                  className="mt-[31px] text-base text-gray-500 tracking-[1.60px] uppercase w-auto"
                  size="txtPoppinsSemiBold16"
                >
                  master data
                </Text>
                <div className="flex flex-col items-center justify-end mt-[27px] w-full">
                  <MenuItem
                    icon={
                      <Img
                        className="h-6 w-6"
                        src="images/img_grommeticonsuseradmin.svg"
                        alt="grommeticonsuse"
                      />
                    }
                    active={window.location.pathname === "/admin"}
                    href="/admin"
                  >
                    <Text className="flex-1 my-0.5 w-auto">Admin</Text>
                  </MenuItem>
                  <MenuItem
                    icon={
                      <Img
                        className="h-6 mb-[5px] w-6"
                        src="images/img_antdesignuseroutlined.svg"
                        alt="antdesignuserou"
                      />
                    }
                    active={window.location.pathname === "/pengguna"}
                    href="/pengguna"
                  >
                    <Text className="flex-1 my-0.5 w-auto">Pengguna</Text>
                  </MenuItem>
                </div>
              </Menu>
            </Sidebar>
            <div className="flex flex-1 flex-col gap-1.5 items-center justify-start md:px-5 w-full">
              <div className="flex flex-col items-center justify-start w-full">
                <header className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between p-6 sm:px-5 w-full">
                  <div className="flex sm:flex-col flex-row gap-6 items-center justify-between w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-auto">
                      <Text
                        className="text-base text-indigo-A200 w-auto"
                        size="txtPoppinsSemiBold16IndigoA200"
                      >
                        Admin
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
                        Tambahkan Admin
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
                  </div>
                </header>
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
                      Tambahkan Admin
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
                  Informasi Admin
                </Text>
                <div className="flex flex-col gap-6 items-start justify-start w-full">
                  <div className="flex flex-col gap-2 items-start justify-center w-full">
                    <Text
                      className="text-blue_gray-800 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray800"
                    >
                      Foto Profil
                    </Text>
                    <Input
                      name="avatar"
                      placeholder=""
                      className="p-0 w-full"
                      wrapClassName="border border-gray-400 border-solid flex h-[123px] rounded-[61px] w-[123px]"
                      suffix={
                        <Img
                          className="h-[82px] ml-[21px] my-auto"
                          src="images/img_phuser.svg"
                          alt="ph:user"
                        />
                      }
                      color="indigo_50"
                      size="md"
                      variant="fill"
                    ></Input>
                  </div>
                  <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full"></div>
                  <div className="flex md:flex-col flex-row gap-6 items-start justify-start w-full">
                    <div className="flex flex-1 flex-col gap-2 items-start justify-center w-full">
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
                      <div className="flex flex-row gap-4 items-center justify-start w-auto">
                        <div className="flex flex-row gap-2 items-center justify-start w-auto">
                          <Img
                            className="h-6 w-6"
                            src="images/img_icbaselinerad.svg"
                            alt="icbaselinerad"
                          />
                          <Text
                            className="text-base text-blue_gray-500 w-auto"
                            size="txtPoppinsRegular16Bluegray500"
                          >
                            Active
                          </Text>
                        </div>
                        <div className="flex flex-row gap-2 items-center justify-start w-auto">
                          <Img
                            className="h-6 w-6"
                            src="images/img_icbaselinerad_blue_gray_200.svg"
                            alt="icbaselinerad_One"
                          />
                          <Text
                            className="text-base text-blue_gray-500 w-auto"
                            size="txtPoppinsRegular16Bluegray500"
                          >
                            Inactive
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TambahAdminPage;
