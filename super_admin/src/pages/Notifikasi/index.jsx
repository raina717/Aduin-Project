/* eslint-disable react-hooks/exhaustive-deps */
import Container from "components/Container";
import Tabs from "components/Tabs";
import React, { useContext, useEffect, useState } from "react";

import AvatarImg from "../../assets/images/avatar.png";
import NoData from "../../assets/images/no_data.jpg";

import { Text } from "components";
import { ContainerContext } from "context/ContainerContext";
import { authServices } from "services";
import { checkArray } from "utils";
import { toast } from "react-toastify";
import Skeleton from "components/CardAduan/Skeleton";
import moment from "moment";
import NotifPagination from "components/Pagination/NotifPagination";

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

const Notifikasi = () => {
  const {
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const [loading, setLoading] = useState(false);

  const [tabActive, setTabActive] = useState(TabsNotif[0]);

  const [myNotification, setMyNotification] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    initializePage();
  }, []);

  useEffect(() => {
    fetchInitialize();
  }, [tabActive, currentPage]);

  const initializePage = () => {
    setHeaderTitle("Notifikasi");
    setHeaderSubMenu([]);
    setAdditionalHeader();
    setIsSubMenu(false);
  };

  const fetchInitialize = async () => {
    setLoading(true);

    const response = await authServices.myNotification({
      ...(tabActive?.id === "all" ? {} : { is_read: false }),
    });

    setLoading(false);

    if (response?.ok) {
      setTotalPages(response?.data?.meta?.totalPages);

      if (checkArray(response?.data?.data)) {
        const data = response?.data?.data;

        setMyNotification(data);
      } else {
        setMyNotification([]);
      }
    } else {
      toast(response?.data?.message, {
        type: "error",
      });
    }
  };

  return (
    <Container withoutFilter>
      <section className="flex items-center justify-between">
        <Tabs
          options={TabsNotif}
          onSelect={setTabActive}
          isActive={tabActive}
        />

        <NotifPagination
          initialPage={currentPage - 1}
          pageCount={totalPages}
          handlePageClick={(e) => setCurrentPage(e?.selected + 1)}
        />
      </section>

      <section className="h-full overflow-auto no-scrollbar w-[70%] mt-7 bg-white-A700 rounded-[14px] p-8 flex flex-col space-y-6">
        {loading && myNotification.length === 0 ? (
          <>
            <CardNotifSkeleton />
            <CardNotifSkeleton />
          </>
        ) : myNotification.length === 0 ? (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <img src={NoData} alt="no data" className="w-[30%] h-auto" />

            <Text>Tidak ada notifikasi</Text>
          </div>
        ) : (
          myNotification.map((d, index) => <CardNotif key={index} data={d} />)
        )}
      </section>
    </Container>
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

const CardNotif = ({ data }) => {
  return (
    <div className="bg-gray-100_01 border border-gray-300 rounded-[14px] p-6 cursor-pointer hover:bg-[rgba(68,117,242,0.1)] transition-all duration-300 ease-in-out">
      <div className="flex items-start space-x-2">
        <img
          src={AvatarImg}
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

export default Notifikasi;
