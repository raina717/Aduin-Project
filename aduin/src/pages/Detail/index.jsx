import React, { useEffect, useState } from "react";

import { Button, Img, Input, Line, List, Text } from "components";
import Header from "components/Header";
import HomeColumnellipseeightynineOne from "components/HomeColumnellipseeightynineOne";
import FooterPage from "components/Footer";
import CardAduan from "components/CardAduan";
import Header1 from "components/Header1";
import { authServices, complainServices } from "services";
import { useParams } from "react-router-dom";
import LoadingAduan from "components/CardAduan/LoadingAduan";

const DetailPage = () => {
  const { detailId } = useParams();

  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [dataComplaint, setDataComplaint] = useState(null);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const token = localStorage.getItem("BEARER_TOKEN");

    if (token) {
      fetchInitialize();
      setIsLoggedIn(true);
    }
  }, []);

  const fetchInitialize = async () => {
    const id = detailId ? detailId.split("-") : "";

    const [complaint, userProfile] = await Promise.all([
      complainServices.detailComplaint(id[0]),
      authServices.userProfile(),
    ]);

    if (complaint.ok) {
      if (complaint?.data?.data) {
        setDataComplaint(complaint?.data?.data);
      }
    }

    if (userProfile?.ok) {
      if (userProfile?.data?.data) {
        setProfile(userProfile?.data?.data);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full bg-[rgb(248,250,252)]">
          {isLoggedIn ? (
            <Header className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full" />
          ) : (
            <Header1 className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full" />
          )}

          {/* Content for Each Tab */}
          <div className="mx-auto max-w-4xl w-full mt-9">
            <div className="flex flex-col space-y-2">
              {!loading && Object.keys(dataComplaint ?? {}).length > 0 ? (
                <CardAduan data={dataComplaint} profile={profile} />
              ) : (
                <LoadingAduan />
              )}
            </div>
          </div>

          <FooterPage />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
