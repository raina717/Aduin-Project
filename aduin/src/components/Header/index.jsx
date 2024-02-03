/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { Img, Text, Input } from "components";

import Loader from "components/Loader";
import { NavLink } from "react-router-dom";
import { authServices } from "services";
import AvatarImg from "../../assets/images/avatar.png";
import { ReactComponent as NotifIcon } from "../../assets/icons/img_ionnotifcations.svg";
import Tabs from "components/Tabs";
import { checkArray } from "utils";
import moment from "moment";
import Skeleton from "components/CardAduan/Skeleton";

import NoData from "../../assets/images/no_data.jpg";
import { ContainerContext } from "context/ContainerContext";
import NotifPagination from "components/HomePagination/NotifPagination";

const TabsNotif = [
  {
    id: "all",
    label: "Semua",
  },
  {
    id: "unread",
    label: "Belum Dibaca",
  },
];

const Header = (props) => {
  const { searchInput, setSearchInput } = useContext(ContainerContext);

  const [dataProfile, setDataProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const [loadingNotif, setLoadingNotif] = useState(false);
  const [tabNotif, setTabNotif] = useState(TabsNotif[0]);
  const [notificationList, setNotificationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [currentMenu, setCurrentMenu] = useState(
    `/${window.location.pathname.split("/")[1]}`
  );

  useEffect(() => {
    getCurrentPage({ key: `/${window.location.pathname.split("/")[1]}` });
  }, [currentMenu]);

  const getCurrentPage = (value) => {
    switch (value.key) {
      case "/panduan":
        setCurrentMenu("/panduan");
        break;
      case "/tentang-kami":
        setCurrentMenu("/tentang-kami");
        break;
      default:
        setCurrentMenu("/beranda");
        break;
    }
  };

  useEffect(() => {
    initializeFetch();
  }, []);

  useEffect(() => {
    if (showNotif) {
      fetchNotification();
    }
  }, [showNotif, tabNotif, currentPage]);

  /// *********************************************

  // **************** SERVICES ****************
  const initializeFetch = async () => {
    const response = await authServices.userProfile();

    if (response.ok) {
      setDataProfile(response?.data?.data);
    }
  };

  const fetchNotification = async () => {
    setLoadingNotif(true);

    const response = await authServices.myNotification({
      ...(tabNotif?.id === "unread" ? { is_read: false } : {}),
    });

    setLoadingNotif(false);

    if (response.ok) {
      setTotalPages(response?.data?.meta?.totalPages);

      if (checkArray(response?.data?.data)) {
        setNotificationList(response?.data?.data);
      } else {
        setNotificationList([]);
      }
    } else {
      setNotificationList([]);
    }
  };

  const handleReadNotif = async (id) => {
    const payload = {
      notif_ids: [id],
      user_id: dataProfile?.user_id,
      is_read: true,
    };

    const response = await authServices.updateNotification(payload);

    if (response.ok) {
      if (tabNotif?.id === "unread") {
        fetchNotification();
      } else {
        const modifNotifList = notificationList.map((d) =>
          d?.id === id ? { ...d, is_read: true } : d
        );

        setNotificationList(modifNotifList);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      window.location.replace("/masuk");
    }, 2000);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white w-full">
        <header className={props.className}>
          <div className="flex md:flex-col flex-row gap-6 items-center justify-start w-full">
            <NavLink to="/">
              <div className="flex flex-col items-center justify-start p-2.5 w-auto cursor-pointer">
                <Text
                  className="sm:text-2xl md:text-[26px] text-[28px] text-indigo-A200 w-auto"
                  size="txtPlusJakartaSansBold28"
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
            </NavLink>
            <ul className="flex flex-row gap-8 sm:hidden items-center justify-start w-auto common-row-list">
              <li>
                <NavLink to="/">
                  <Text
                    className={`hover:font-semibold text-base text-gray-500 hover:text-indigo-A200 ${
                      currentMenu === "/beranda" ? "text-indigo-A200" : ""
                    }`}
                    size="txtPoppinsRegular16Bluegray200"
                  >
                    Beranda
                  </Text>
                </NavLink>
              </li>
              <li>
                <NavLink to="/panduan">
                  <Text
                    className={`hover:font-semibold text-base text-gray-500 hover:text-indigo-A200 ${
                      currentMenu === "/panduan"
                        ? "text-indigo-A200 font-semibold"
                        : ""
                    }`}
                    size="txtPoppinsRegular16Bluegray200"
                  >
                    Panduan
                  </Text>
                </NavLink>
              </li>
              <li>
                <NavLink to="/tentang-kami">
                  <Text
                    className={`hover:font-semibold text-base text-gray-500 hover:text-indigo-A200 ${
                      currentMenu === "/tentang-kami" ? "text-indigo-A200" : ""
                    }`}
                    size="txtPoppinsRegular16Bluegray200"
                  >
                    Tentang Kami
                  </Text>
                </NavLink>
              </li>
            </ul>
            {/* Input search */}
            <div className="bg-white-A700 flex flex-1 flex-col items-start justify-start w-full">
              {!props.withoutSearchInput && (
                <div className="flex flex-col items-start justify-center w-full">
                  <Input
                    name="frame628479"
                    placeholder="Cari ID atau Judul Aduan Disini..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="leading-[normal] p-0 placeholder:text-blue_gray-400 sm:pr-5 text-blue_gray-400 text-left tracking-[0.60px] w-full font-poppins"
                    wrapClassName="bg-gray-100_01 flex px-3.5 py-2 rounded w-full border border-gray-400"
                    prefix={
                      <Img
                        className="cursor-pointer h-5 mr-2 my-auto"
                        src="https://staging.digipac.id/public/images/iconsearch.png"
                        alt="search"
                      />
                    }
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        props.onPressEnter() ?? e.preventDefault();
                      }
                    }}
                  />
                </div>
              )}
            </div>
            {/* ====================================== */}

            <div className="flex flex-row gap-6 items-center justify-end w-auto">
              <div className="relative">
                <button onClick={() => setShowNotif(!showNotif)}>
                  <NotifIcon />
                </button>

                {showNotif && (
                  <div className="absolute top-12 -right-[80px] z-[99] mt-1 w-[600px] h-[80vh]">
                    <div className="bg-[#ffffff] border border-gray-300 p-6 rounded-[14px] h-full">
                      <div className="flex flex-col space-y-4 h-full overflow-hidden">
                        <Text
                          size=""
                          className="font-poppins font-semibold text-2xl"
                        >
                          Notifikasi
                        </Text>

                        <div className="flex items-center justify-between">
                          <Tabs
                            options={TabsNotif}
                            isActive={tabNotif}
                            onSelect={setTabNotif}
                          />

                          <NotifPagination
                            initialPage={currentPage - 1}
                            limit={10}
                            pageCount={totalPages}
                            handlePageClick={(e) =>
                              setCurrentPage(e?.selected + 1)
                            }
                          />
                        </div>

                        <div className="flex flex-col space-y-2 w-full h-full overflow-auto no-scrollbar">
                          {loadingNotif && notificationList.length === 0 ? (
                            <>
                              <CardNotifSkeleton />
                              <CardNotifSkeleton />
                            </>
                          ) : notificationList.length === 0 ? (
                            <div className="h-full w-full flex flex-col justify-center items-center">
                              <img
                                src={NoData}
                                alt="no data"
                                className="w-[30%] h-auto"
                              />

                              <Text>Tidak ada notifikasi</Text>
                            </div>
                          ) : (
                            notificationList.map((d, index) => (
                              <CardNotif
                                key={index}
                                data={d}
                                onClick={() => handleReadNotif(d?.id)}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start justify-start w-12 relative h-12">
                <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
                  <button onClick={() => setShowMenu(!showMenu)}>
                    <img
                      className="h-12 md:h-auto rounded-[50%] w-12"
                      src={
                        dataProfile?.profile_photo === ""
                          ? AvatarImg
                          : dataProfile?.profile_photo
                          ? dataProfile?.profile_photo
                          : AvatarImg
                      }
                      alt="ellipseEightyNine"
                    />
                  </button>
                </div>

                {showMenu && (
                  <div className="absolute top-12 z-[99] mt-3">
                    <ul className="border flex flex-col bg-white-A700_01 shadow-md rounded-md">
                      <li className="hover:bg-primary hover:text-white-A700_01 px-3 py-2 pr-8">
                        <NavLink to="/profile">Profile</NavLink>
                      </li>

                      <li className="hover:bg-primary hover:text-white-A700_01 px-3 py-2 pr-8">
                        <button onClick={handleLogout}>Keluar</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {loading && <Loader />}
    </>
  );
};

const CardNotifSkeleton = () => {
  return (
    <div className="bg-white-A700 border border-gray-300 rounded-[14px] p-6">
      <div className="flex items-start space-x-2">
        <Skeleton circle className="h-12 w-12" />

        <div className="flex flex-1 flex-col space-y-2">
          <Skeleton width="200px" height="16px" />
          <Skeleton width="70%" height="14px" />
          <Skeleton width="150px" height="12px" />
        </div>
      </div>
    </div>
  );
};

const CardNotif = ({ data, onClick }) => {
  return (
    <div
      className={`${
        data?.is_read ? "bg-[rgba(68,117,242,0.1)]" : "bg-gray-100_01"
      } border border-gray-300 rounded-[14px] p-6 cursor-pointer hover:bg-[rgba(68,117,242,0.1)] transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-2">
        <img
          src={data?.icon}
          alt="notif_avatar"
          className="h-12 w-12 rounded-full"
        />

        <div className="flex flex-col space-y-2 pointer-events-none">
          <Text size="" className="font-poppins font-medium">
            {data?.title}
          </Text>

          <Text size="" className="text-sm font-poppins text-gray-600">
            {data?.description}
          </Text>

          <Text size="" className="text-xs font-poppins text-gray-600">
            {moment(data?.created_at).format("DD MMM YYYY")} •{" "}
            {moment(data?.created_at).format("HH:mm")}
          </Text>
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {};

export default Header;
