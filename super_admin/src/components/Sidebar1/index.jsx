import React from "react";

import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";

import { Img, Text } from "components";

const Sidebar1 = (props) => {
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <>
      <Sidebar
        onClick={() => collapseSidebar(!collapsed)}
        className={props.className}
      >
        <div className="flex flex-col items-center justify-start mb-[913px] mt-6 mx-auto px-2.5 py-[27px] w-[218px]">
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
        </div>
        <Text
          className="capitalize flex-1 mb-[869px] ml-4 mr-[187px] mt-[130px] text-base text-gray-500 tracking-[1.60px] w-auto"
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
              fontFamily: "Poppins",
              borderRadius: "4px",
              [`&:hover, &.ps-active`]: {
                color: "#4475f2",
                fontWeight: "600 !important",
                backgroundColor: "#edf2feff !important",
              },
            },
          }}
          className="flex flex-col items-center justify-start mb-[624px] mt-[169px] pt-3 px-4 w-[88%]"
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
                  src="images/img_grommeticonsuseradmin_blue_gray_400.svg"
                  alt="grommeticonsuse"
                />
              }
              active={window.location.pathname === "/admin"}
            >
              <Text className="flex-1 my-0.5 w-auto">Admin</Text>
            </MenuItem>
            <MenuItem
              icon={
                <Img
                  className="h-6 mb-[5px] w-6"
                  src="images/img_antdesignuseroutlined_indigo_a200.svg"
                  alt="antdesignuserou"
                />
              }
              active={window.location.pathname === "/pengguna"}
            >
              <Text className="flex-1 my-0.5 w-auto">Pengguna</Text>
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </>
  );
};

Sidebar1.defaultProps = {};

export default Sidebar1;
