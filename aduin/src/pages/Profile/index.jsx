/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Container from "components/Container";
import { authServices, complainServices } from "services";

import AvatarImg from "../../assets/images/avatar.png";
import { Text } from "components";
import Tabs from "components/Tabs";
import { checkArray } from "utils";
import CardAduan from "components/CardAduan";
import NoDataImg from "../../assets/images/no_data.jpg";
import LoadingAduan from "components/CardAduan/LoadingAduan";
import HomePagination from "components/HomePagination";
import { NavLink } from "react-router-dom";
import { ContainerContext } from "context/ContainerContext";

const totalAduanCount = [
  {
    id: "total",
    label: "Total",
  },
  {
    id: "Dalam Proses",
    label: "Diproses",
  },
  {
    id: "Selesai",
    label: "Selesai",
  },
  {
    id: "Ditolak",
    label: "Ditolak",
  },
];

const TabMenu = [
  {
    id: 0,
    label: "Semua",
    value: "all",
  },
  {
    id: 1,
    label: "Diproses",
    value: "Dalam Proses",
  },
  {
    id: 2,
    label: "Selesai",
    value: "Selesai",
  },
  {
    id: 3,
    label: "Ditolak",
    value: "Ditolak",
  },
];

const ProfilePage = () => {
  const { searchInput } = useContext(ContainerContext);

  const [profile, setProfile] = useState(null);
  const [dataComplaints, setDataComplaints] = useState([]);
  const [dataAnalytics, setDataAnalytics] = useState([]);

  const [tabActive, setTabActive] = useState(TabMenu[0]);

  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [tabActive, currentPage]);

  const fetchComplaints = async () => {
    setLoading(true);

    const complaints = await complainServices.allComplaint({
      show_current_user: true,
      page: currentPage,
      search: searchInput,
      ...(tabActive?.value === "all" ? {} : { status: tabActive?.value }),
    });

    setLoading(false);

    if (complaints.ok) {
      setTotalPages(complaints?.data?.meta?.totalPages);

      setDataAnalytics(complaints?.data?.meta?.aggregations?.statuses);

      if (checkArray(complaints?.data?.data)) {
        setDataComplaints(complaints?.data?.data);
      } else {
        setDataComplaints([]);
      }
    }
  };

  const fetchUserProfile = async () => {
    const userProfile = await authServices.userProfile();

    if (userProfile.ok) {
      if (userProfile.data?.data) setProfile(userProfile?.data?.data);
    }
  };

  const handleChangeTab = (tab) => {
    setTabActive(tab);

    setCurrentPage(1);
  };

  return (
    <Container
      onPressEnter={() => {
        if (currentPage === 1) {
          fetchComplaints();
        } else {
          setCurrentPage(1);
        }
      }}
    >
      <section className="w-full">
        <ProfileAnalytics profile={profile} dataAnalytics={dataAnalytics} />

        <div className="mt-11 max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <Text size="" className="font-poppins font-semibold text-[32px]">
              Aduan Saya
            </Text>

            <NavLink to="/">
              <button
                className="button-large border border-secondary text-secondary font-bold"
                style={{
                  paddingLeft: "70px",
                  paddingRight: "70px",
                }}
              >
                Buat Aduan
              </button>
            </NavLink>
          </div>

          <div className="mt-4">
            <Tabs
              options={TabMenu}
              onSelect={handleChangeTab}
              isActive={tabActive}
            />
          </div>

          <div className="mt-4">
            <div className="flex flex-col space-y-2">
              {!loading && checkArray(dataComplaints) ? (
                dataComplaints.map((d) => (
                  <CardAduan data={d} profile={profile} />
                ))
              ) : dataComplaints.length === 0 && !loading ? (
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

          <div className="mt-8">
            <HomePagination
              initialPage={currentPage - 1}
              limit={10}
              pageCount={totalPages}
              handlePageClick={(e) => setCurrentPage(e?.selected + 1)}
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

const ProfileAnalytics = ({ profile, dataAnalytics }) => {
  return (
    <div className="bg-[#fff]">
      <div className="max-w-4xl mx-auto flex items-center py-[25px] justify-between">
        {/* Profile */}
        <div className="flex space-x-2">
          <img
            src={
              !profile?.profile_photo
                ? AvatarImg
                : profile?.profile_photo === ""
                ? AvatarImg
                : profile?.profile_photo
            }
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <Text size="" className="font-poppins font-medium">
              {profile?.fullname ?? "-"}
            </Text>

            <Text size="" className="font-poppins text-sm text-gray-600">
              {profile?.email}
            </Text>
          </div>
        </div>

        {/* Counter */}
        <div className="flex space-x-5 items-start">
          {totalAduanCount.map((d) => (
            <div className="flex flex-col items-center">
              <Text size="" className="font-poppins font-semibold text-2xl">
                {checkArray(dataAnalytics)
                  ? dataAnalytics.find((analytics) => analytics.status === d.id)
                      ?.count ??
                    dataAnalytics.reduce((prev, curr) => curr?.count + prev, 0)
                  : 0}
              </Text>
              <Text size="" className="font-poppins text-[10px] text-gray-700">
                {d.label}
              </Text>
            </div>
          ))}
        </div>

        {/* Button */}
        <div>
          <NavLink to="/profile/edit">
            <button className="button-large bg-white-A700_01 border border-secondary font-poppins font-bold text-secondary">
              Ubah Data
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
