import React, { useContext } from "react";
import { Text } from "./Text";

import { NavLink } from "react-router-dom";
import { SidebarMenu } from "utils/constants";
import { ContainerContext } from "context/ContainerContext";

const Sidebar = ({ onChangePage, currentPage }) => {
  const { profile, handleLogout } = useContext(ContainerContext);

  return (
    <div className="bg-white px-4 py-6 w-[250px] sticky left-0 top-0 bottom-0 h-screen border-r">
      <div className="px-2.5 py-4">
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

      <div className="flex flex-col space-y-5 mt-5">
        {SidebarMenu.map((d, index) => (
          <div key={index}>
            <Text
              className="text-base text-[#A0AEC0] tracking-[1.60px] uppercase mb-4"
              size="txtPoppinsSemiBold16"
            >
              {d.title}
            </Text>

            <div className="flex flex-col space-y-1">
              {d.subMenu.map((menu, index) => {
                if (menu?.label === "Admin" && profile?.role?.id !== 2) {
                  return null;
                }

                return (
                  <NavLink
                    key={index}
                    to={menu.path}
                    onClick={() => {
                      if (menu.path === "") {
                        handleLogout();
                      } else {
                        onChangePage(menu);
                      }
                    }}
                  >
                    <div
                      className={`flex items-center py-2.5 px-2.5 space-x-1.5 cursor-pointer group ${
                        currentPage === menu.path ? "bg-[#EDF2FE] rounded" : ""
                      } hover:bg-[#EDF2FE] hover:rounded transition-all duration-100 ease-in-out`}
                    >
                      <menu.icon
                        {...(menu.strokeIcon
                          ? {
                              stroke: "#718096",
                              className: `${
                                currentPage === menu.path
                                  ? "stroke-[#4475F2]"
                                  : ""
                              } group-hover:stroke-[#4475F2]`,
                            }
                          : {
                              fill: "#718096",
                              className: `${
                                currentPage === menu.path
                                  ? "fill-[#4475F2]"
                                  : ""
                              } group-hover:fill-[#4475F2]`,
                            })}
                      />

                      <Text
                        size="txtPoppinsRegular16"
                        className={`${
                          currentPage === menu.path
                            ? "text-[#4475F2] font-semibold"
                            : "text-[#718096]"
                        } group-hover:text-[#4475F2] group-hover:font-semibold transition-all duration-100`}
                      >
                        {menu.label}
                      </Text>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
