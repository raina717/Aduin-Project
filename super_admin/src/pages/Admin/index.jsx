/* eslint-disable react-hooks/exhaustive-deps */
import BadgeStatus from "components/BadgeStatus";
import ButtonDetail from "components/ButtonDetail";
import Container from "components/Container";
import CustomTable from "components/CustomTable";
import { ContainerContext } from "context/ContainerContext";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { adminServices } from "services";
import { checkArray } from "utils";
import { TableDataAdmin } from "utils/constants";

import NoData from "../../assets/images/no_data.jpg";
import { Text } from "components";
import TableSkeleton from "components/TableSkeleton";
import Pagination from "components/Pagination";

const AdminList = () => {
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
    setHeaderTitle("Admin");
    setHeaderSubMenu([]);
    setIsSubMenu(false);
    setAdditionalHeader(
      <NavLink to="/admin/tambah">
        <button className="button-large bg-secondary text-white-A700">
          Tambahkan Admin
        </button>
      </NavLink>
    );
  };

  const fetchInitialize = async () => {
    setLoading(true);

    const response = await adminServices.listUser({
      role: "admin",
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

  const renderCustomTableBody = (data) => {
    let result = [];

    if (checkArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const {
          user_id,
          fullname,
          email,
          role,
          status,
          created_at,
          updated_at,
        } = data[i];

        result.push(
          <tr className="bg-white-A700 border-b border-b-gray-300">
            <td className="px-3 py-[10px] text-xs font-poppins">{fullname}</td>
            <td className="px-3 py-[10px] text-xs font-poppins">{email}</td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {role?.role_name}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              <BadgeStatus label={status} isDanger={status === "Inactive"} />
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {moment(created_at ?? "").format("DD MMM YYYY HH:mm")}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {moment(updated_at ?? "").format("DD MMM YYYY HH:mm")}
            </td>
            <td align="center" className={`px-3 py-2.5`}>
              <ButtonDetail
                disabled={role?.id === 2}
                path={`/admin/${user_id}/${fullname}`}
                className={role?.id === 2 ? "invisible" : "visible"}
              />
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
            options={TableDataAdmin}
            customTableBody={renderCustomTableBody(userList)}
          />
        )}
      </section>
    </Container>
  );
};

export default AdminList;
