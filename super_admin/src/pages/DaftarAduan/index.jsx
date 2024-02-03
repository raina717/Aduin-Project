/* eslint-disable react-hooks/exhaustive-deps */
import Container from "components/Container";
import CustomTable from "components/CustomTable";
import Tabs from "components/Tabs";
import React, { useContext, useEffect, useState } from "react";
import { TableData } from "utils/constants";

import ButtonDetail from "components/ButtonDetail";
import { ContainerContext } from "context/ContainerContext";
import { complainServices } from "services";
import { checkArray } from "utils";
import moment from "moment";
import Pagination from "components/Pagination";
import TableSkeleton from "components/TableSkeleton";

import NoData from "../../assets/images/no_data.jpg";
import { Text } from "components";

const TabMenu = [
  {
    id: "total",
    label: "Semua",
  },
  {
    id: "Dalam Proses",
    label: "Aduan Diproses",
  },
  {
    id: "Selesai",
    label: "Aduan Selesai",
  },
  {
    id: "Ditolak",
    label: "Aduan Ditolak",
  },
];

const DaftarAduan = () => {
  const {
    profile,
    kategoriAduan,
    searchInput,
    komisi,
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const [loading, setLoading] = useState(false);

  const [tabActive, setTabActive] = useState(TabMenu[0]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [metaPage, setMetaPage] = useState([]);
  const [dataComplaints, setDataComplaints] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [kategoriAduan]);

  useEffect(() => {
    fetchInitialize();
  }, [currentPage, tabActive, kategoriAduan, komisi]);

  useEffect(() => {
    initializePage();
  }, []);

  const initializePage = () => {
    setHeaderTitle("Daftar Aduan");
    setHeaderSubMenu([]);
    setAdditionalHeader();
    setIsSubMenu(false);
  };

  const fetchInitialize = async () => {
    setLoading(true);

    const response = await complainServices.allComplaint({
      page: currentPage,
      search: searchInput,
      ...(komisi && !kategoriAduan ? { sector_id: komisi?.id } : {}),
      ...((komisi && kategoriAduan) ||
      (profile?.role?.id !== 3 && kategoriAduan)
        ? { category: kategoriAduan?.value }
        : {}),
      ...(tabActive?.id === "total" ? {} : { status: tabActive?.id }),
    });

    setLoading(false);

    if (response.ok) {
      if (checkArray(response?.data?.meta?.aggregations?.statuses)) {
        setMetaPage(response?.data?.meta?.aggregations?.statuses);
      }

      setTotalPages(response?.data?.meta?.totalPages);

      if (checkArray(response?.data?.data)) {
        setDataComplaints(response?.data?.data);
      } else {
        setDataComplaints([]);
      }
    }
  };

  /**
   * @param {typeof TableData} data
   */
  const renderCustomTableBody = (data) => {
    let result = [];

    if (checkArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const {
          complaint_id,
          complaint_num,
          submited_by,
          title,
          location,
          date,
          created_at,
          category,
          is_anonymous,
        } = data[i];

        result.push(
          <tr className="bg-white-A700 border-b border-b-gray-300">
            <td className="px-3 py-[10px] text-xs font-poppins">
              {complaint_num}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {is_anonymous ? "-" : submited_by?.name}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins ellipsis">
              <span>{title}</span>
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins ellipsis">
              <span>{location}</span>
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {moment(date ?? "").format("DD MMM YYYY")}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {moment(created_at ?? "").format("DD MMM YYYY, HH:mm")}
            </td>
            <td className="px-3 py-[10px] text-xs font-poppins">
              {category?.category_name}
            </td>
            <td align="center">
              <ButtonDetail path={`/aduan/${complaint_id}-${complaint_num}`} />
            </td>
          </tr>
        );
      }
    }

    return result;
  };

  return (
    <Container
      filterAnggotaDprd={profile ? profile?.role?.id === 3 : false}
      onPressEnter={() => {
        if (currentPage > 1) {
          setCurrentPage(1);
        } else {
          fetchInitialize();
        }
      }}
    >
      <section className="mt-8 flex justify-between">
        <Tabs
          options={TabMenu}
          onSelect={(tab) => {
            setCurrentPage(1);

            setTabActive(tab);
          }}
          isActive={tabActive}
          customCount={(d) => {
            if (checkArray(metaPage)) {
              if (d?.id === "total") {
                return metaPage.reduce((prev, curr) => curr?.count + prev, 0);
              }

              return metaPage.find((val) => val?.status === d?.id)?.count;
            }
          }}
        />

        <Pagination
          initialPage={currentPage - 1}
          pageCount={totalPages}
          handlePageClick={(e) => setCurrentPage(e?.selected + 1)}
        />
      </section>

      <section className="h-full overflow-auto no-scrollbar">
        <div className="h-full">
          {loading && dataComplaints?.length === 0 ? (
            <TableSkeleton />
          ) : dataComplaints?.length === 0 ? (
            <div className="card-custom px-4 flex flex-col justify-center items-center">
              <img src={NoData} alt="no data" className="w-[250px] h-auto" />

              <Text>Tidak ada data aduan</Text>
            </div>
          ) : (
            <CustomTable
              options={{
                categories: TableData.categories,
                data: dataComplaints,
              }}
              customTableBody={renderCustomTableBody(dataComplaints)}
            />
          )}
        </div>
      </section>
    </Container>
  );
};

export default DaftarAduan;
