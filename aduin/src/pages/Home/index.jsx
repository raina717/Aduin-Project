/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { Img, Line, SelectBox, Text } from "components";
import Header1 from "components/Header1";
import HomeBuataduan from "components/HomeBuataduan";
import HomePagination from "components/HomePagination";
import FooterPage from "components/Footer";
import Header from "components/Header";
import CardAduan from "components/CardAduan";
import { authServices, complainServices } from "services";
import { checkArray } from "utils";
import LoadingAduan from "components/CardAduan/LoadingAduan";
import NoDataImg from "../../assets/images/no_data.jpg";
import { ContainerContext } from "context/ContainerContext";
import { FaWhatsapp } from 'react-icons/fa';
const statusAduanOptionsList = [
  { label: "Sedang Diproses", value: "Dalam Proses" },
  { label: "Selesai", value: "Selesai" },
  { label: "Ditolak", value: "Ditolak" },
];
const contentTabs = [
  { id: "semua", label: "Semua" },
  { id: "viral", label: "Lagi Viral" },
];

const Home1Page = () => {
  const { searchInput } = useContext(ContainerContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [complaintLoading, setComplaintLoading] = useState(false);

  const [profile, setProfile] = useState();

  const [activeTab, setActiveTab] = useState("semua");
  const [dataComplaints, setDataComplaints] = useState([]);
  const [complaintCategories, setComplaintCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [aduanStatus, setAduanStatus] = useState();
  const [aduanCategory, setAduanCategory] = useState();

  useEffect(() => {
    fetchComplaint();
  }, [activeTab, currentPage, aduanStatus, aduanCategory]);

  useEffect(() => {
    const token = localStorage.getItem("BEARER_TOKEN");

    fetchInitialize();

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchInitialize = async () => {
    try {
      const [categoriesList, userProfile] = await Promise.all([
        complainServices.allCategories(),
        authServices.userProfile(),
      ]);

      if (categoriesList?.ok) {
        if (checkArray(categoriesList.data?.data)) {
          const filteredData = categoriesList.data?.data.map((d) => ({
            label: d.name,
            value: d.id,
          }));

          setComplaintCategories(filteredData);
        }
      }

      if (userProfile.ok) {
        if (userProfile.data?.data) {
          setProfile(userProfile?.data?.data);
        }
      }
    } catch (err) {
      console.log("log error", err);
    }
  };

  const fetchComplaint = async () => {
    setComplaintLoading(true);

    const complaintList = await complainServices.allComplaint({
      page: currentPage,
      search: searchInput,
      ...(aduanStatus ? { status: aduanStatus } : {}),
      ...(aduanCategory ? { category: aduanCategory } : {}),
      ...(activeTab === "viral" ? { is_viral: true } : {}),
    });

    setComplaintLoading(false);

    if (complaintList?.ok) {
      setTotalPages(complaintList?.data?.meta?.totalPages);

      if (checkArray(complaintList?.data?.data)) {
        setDataComplaints(complaintList?.data?.data);
      } else {
        setDataComplaints([]);
      }
    }
  };

  const handleWhatsAppClick = () => {
    const pesan = encodeURIComponent('Halo, saya ingin membuat aduan.');
    window.location.href = `https://wa.me/6285141267655?text=${pesan}`; 
  };

  return (
    <>
      <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full bg-[rgb(248,250,252)]">
          {isLoggedIn ? (
            <Header
              onPressEnter={() => {
                if (currentPage === 1) {
                  fetchComplaint();
                } else {
                  setCurrentPage(1);
                }
              }}
              className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full"
            />
          ) : (
            <Header1 className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full" />
          )}

          <div className="flex flex-col font-poppins items-start justify-start max-w-[1440px] mt-1 md:px-10 sm:px-5 px-[207px] py-8 w-full">
            <div className="flex flex-col gap-[33px] items-start justify-start max-w-[1026px] mx-auto w-full">
              <HomeBuataduan
                onSuccess={() =>
                  setTimeout(() => {
                    fetchComplaint();
                  }, 1000)
                }
                complaintCategories={complaintCategories}
                className="bg-white-A700 border border-gray-300 border-solid flex flex-col gap-8 items-center justify-center px-4 py-6 rounded-[14px] w-full"
              />
              <Line className="bg-gray-300 h-px w-full" />
              <div className="flex flex-col gap-4 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <Text
                    className="capitalize md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-auto"
                    size="txtPoppinsSemiBold32"
                  >
                    Aduan
                  </Text>

                  <div className="w-full">
                    <div className="flex mb-4 w-full items-center justify-between">
                      <div className="flex">
                        {contentTabs.map((d, index) => (
                          <button
                            key={d.id}
                            className={`py-2 px-4 ${
                              activeTab === d.id
                                ? "bg-blue-500 text-white-A700_01"
                                : "bg-white-A700 hover:bg-gray-300"
                            } ${
                              index === 0
                                ? "rounded-l"
                                : index === contentTabs.length - 1
                                ? "rounded-r"
                                : ""
                            }`}
                            onClick={() => changeTab(d.id)}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-row gap-4 items-start">
                        <div className="flex flex-col items-start justify-start w-auto">
                          <div className="flex flex-col items-start justify-center w-auto sm:w-full">
                            <SelectBox
                              className="border border-gray-400 border-solid text-base text-left w-full"
                              placeholderClassName="text-gray-600"
                              indicator={
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_arrowdown.svg"
                                  alt="arrow_down"
                                />
                              }
                              isClearable
                              isMulti={false}
                              name="frameThree_Two"
                              options={statusAduanOptionsList}
                              isSearchable={false}
                              placeholder="Status Aduan"
                              shape="round"
                              color="white_A700"
                              size="xs"
                              variant="fill"
                              value={aduanStatus}
                              onChange={setAduanStatus}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start w-auto">
                          <div className="flex flex-col items-start justify-center w-auto sm:w-full">
                            <SelectBox
                              className="border border-gray-400 border-solid capitalize leading-[normal] text-base text-left w-full"
                              placeholderClassName="text-gray-600"
                              indicator={
                                <Img
                                  className="h-6 w-6"
                                  src="images/img_arrowdown.svg"
                                  alt="arrow_down"
                                />
                              }
                              isMulti={false}
                              isClearable
                              name="frameThree_Three"
                              options={complaintCategories}
                              isSearchable={false}
                              placeholder="Kategori"
                              shape="round"
                              color="white_A700"
                              size="xs"
                              variant="fill"
                              styles={{
                                menu: (provided) => ({
                                  ...provided,
                                  width: aduanCategory ? "100%" : "250px",
                                }),
                              }}
                              value={aduanCategory}
                              onChange={setAduanCategory}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Content for Each Tab */}
                      <div className="flex flex-col space-y-2">
                        {!complaintLoading && checkArray(dataComplaints) ? (
                          dataComplaints.map((d) => (
                            <CardAduan data={d} profile={profile} />
                          ))
                        ) : dataComplaints.length === 0 && !complaintLoading ? (
                          <div className="card-custom px-4 flex flex-col justify-center items-center">
                            <img
                              src={NoDataImg}
                              alt="no data"
                              className="w-[250px] h-auto"
                            />

                            <Text>Tidak ada data aduan</Text>
                          </div>
                        ) : (
                          <LoadingAduan />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <HomePagination
                initialPage={currentPage - 1}
                limit={10}
                pageCount={totalPages}
                handlePageClick={(e) => setCurrentPage(e?.selected + 1)}
              />
            </div>
          </div>
          {/* whatsapp  */}
          <div className="fixed bottom-4 right-4 z-10 flex flex-col items-center">
            <p className="text-white font-semibold mb-1 text-sm">Buat Aduan Via WhatsApp?</p>
            <div className="bg-green-500 p-2 rounded-full" onClick={handleWhatsAppClick}>
              <FaWhatsapp className="text-white text-4xl " color="white"/>
            </div>
          </div>
          {/* =====================  */}


          <FooterPage />
        </div>
      </div>
    </>
  );
};

export default Home1Page;
