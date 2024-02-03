/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { ContainerContext } from "context/ContainerContext";

import Container from "components/Container";
import BadgeStatus from "components/BadgeStatus";
import ButtonDetail from "components/ButtonDetail";
import CustomTable from "components/CustomTable";
import TableSkeleton from "components/TableSkeleton";
import { Text } from "components";

import { checkArray } from "utils";
import { TableDataPengguna } from "utils/constants";

import moment from "moment";
import { adminServices } from "services";

import NoData from "../../assets/images/no_data.jpg";
import Pagination from "components/Pagination";

const PenggunaList = () => {
  const {
    searchInput,
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    initializePage();
  }, []);

  useEffect(() => {
    fetchInitialize();
  }, [currentPage]);

  const initializePage = () => {
    setHeaderTitle("Pengguna");
    setHeaderSubMenu([]);
    setAdditionalHeader();
    setIsSubMenu(false);
  };

  const fetchInitialize = async () => {
    setLoading(true);

    const response = await adminServices.listUser({
      role: "user",
      ...(searchInput !== "" || !searchInput ? { search: searchInput } : {}),
    });

    setLoading(false);

    if (response?.ok) {
      setTotalPages(response?.data?.meta?.totalPages);

      if (checkArray(response?.data?.data)) {
        setUserList(response?.data?.data);
      } else {
        setUserList([]);
      }
    }
  };

  /**
   * @param {typeof TableDataPengguna} data
   */
  const renderCustomTableBody = (data) => {
    let result = [];

    if (checkArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const { user_id, fullname, email, status, created_at, updated_at } =
          data[i];

        result.push(
          <tr className="bg-white-A700 border-b border-b-gray-300">
            <td className="px-3 py-[10px] text-xs font-poppins">{fullname}</td>
            <td className="px-3 py-[10px] text-xs font-poppins">{email}</td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              <BadgeStatus label={status} isDanger={status === "Inactive"} />
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {moment(created_at ?? "").format("DD MMM YYYY HH:mm")}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {moment(updated_at ?? "").format("DD MMM YYYY HH:mm")}
            </td>
            <td align="center" className="px-3 py-2.5">
              <ButtonDetail path={`/pengguna/${user_id}/${fullname}`} />
            </td>
          </tr>
        );
      }
    }

    return result;
  };

  return (
    <Container searchOnly onPressEnter={() => fetchInitialize()}>
      <section className="mt-8 w-full flex justify-end mb-0.5">
        <Pagination
          initialPage={currentPage - 1}
          pageCount={totalPages}
          handlePageClick={(e) => setCurrentPage(e?.selected + 1)}
        />
      </section>

      <section className="h-full overflow-auto no-scrollbar">
        {loading && userList.length === 0 ? (
          <TableSkeleton />
        ) : userList.length === 0 ? (
          <div className="card-custom px-4 flex flex-col justify-center items-center">
            <img src={NoData} alt="no data" className="w-[250px] h-auto" />

            <Text>Tidak ada data user</Text>
          </div>
        ) : (
          <CustomTable
            options={TableDataPengguna}
            customTableBody={renderCustomTableBody(userList)}
          />
        )}
      </section>
    </Container>
  );
};

export default PenggunaList;
