/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Input, Text } from "components";
import Container from "components/Container";

import AvatarImg from "../../assets/images/avatar.png";
import { authServices, complainServices } from "services";
import { useFormik } from "formik";
import { FormEditProfileScheme } from "utils/FormScheme";
import { ErrorMessage } from "components/ErrorMessage";

import Swal from "sweetalert2";
import { LoadingAnimation } from "components/Loader";

const UbahprofilePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [photoProfile, setPhotoProfile] = useState();

  useEffect(() => {
    fetchInitialize();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      whatsapp_number: "",
      address: "",
    },
    validationSchema: FormEditProfileScheme,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const fetchInitialize = async () => {
    try {
      const response = await authServices.userProfile();

      if (response.ok) {
        const profile = response?.data?.data;

        formik.setValues({
          fullname: profile?.fullname,
          email: profile?.email,
          whatsapp_number: profile?.whatsapp_number,
          address: profile?.address,
        });

        setProfileData(profile);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSubmit = async (payload) => {
    setLoading(true);

    // ** Check Is There Update
    let updateCount = 0;

    if (photoProfile) updateCount++;

    Object.entries(profileData).map(([key, value]) => {
      if (payload[key]) {
        if (payload[key] !== value) updateCount++;
      }
    });

    if (updateCount > 0) {
      let path = "";

      if (photoProfile) {
        const uploadPhoto = await complainServices.uploadEvidence({
          file: photoProfile,
        });

        if (uploadPhoto.ok) {
          path = uploadPhoto?.data?.data?.url;
        }
      }

      // ** Create payload
      const postData = {
        fullname: payload?.fullname,
        profile_photo: path === "" ? profileData?.profile_photo : path,
        whatsapp_number: payload?.whatsapp_number,
        address: payload?.address,
      };

      const response = await authServices.updateProfile(postData);

      setLoading(false);

      if (response.ok) {
        Swal.fire({
          title: "Berhasil",
          text: "Profile berhasil di ubah!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text:
            response?.data?.response?.data?.message ?? "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  const onClickBackProfile = () => {
    navigate("/profile");
  };

  const renderPhotoProfile = useCallback(() => {
    if (photoProfile) {
      const image = URL.createObjectURL(photoProfile);

      return image;
    }

    return profileData?.profile_photo === ""
      ? AvatarImg
      : profileData?.profile_photo;
  }, [photoProfile, profileData]);

  return (
    <>
      <Container withoutSearchInput>
        <div className="flex flex-col font-poppins gap-8 items-start justify-start max-w-[873px] mt-[47px] mx-auto md:px-5 w-full">
          <Button
            className="cursor-pointer font-bold h-[50px] min-w-[188px] text-base text-center"
            shape="round"
            color="deep_orange_A200"
            size="md"
            variant="outline"
            onClick={onClickBackProfile}
          >
            Kembali Ke Profil
          </Button>
          <div className="flex flex-col gap-4 items-start justify-start w-auto md:w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-auto">
              <Text
                className="capitalize md:text-3xl sm:text-[28px] text-[32px] text-gray-900 w-auto"
                size="txtPoppinsSemiBold32"
              >
                Ubah Profil
              </Text>
            </div>

            <div className="bg-white-A700 border border-gray-300 border-solid rounded-[14px] px-4 py-6 relative">
              <div className="flex flex-col gap-4 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-col gap-4 items-start justify-start w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <label
                          aria-required={true}
                          className="text-gray-700 w-auto font-poppins text-sm"
                        >
                          Foto Profile
                        </label>

                        <div className="flex flex-row gap-2 items-center justify-start w-auto">
                          <Img
                            className="h-[123px] md:h-auto rounded-[50%] w-[123px]"
                            src={renderPhotoProfile()}
                            alt="avatar"
                          />

                          <label
                            htmlFor="uploadProfile"
                            className="button-large border border-secondary text-secondary font-poppins font-bold cursor-pointer"
                          >
                            Ubah
                          </label>

                          <input
                            id="uploadProfile"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setPhotoProfile(e.target.files[0])}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 items-start justify-center w-full">
                        <div className="flex flex-row gap-1 items-center justify-start w-auto">
                          <Text
                            className="text-gray-700 text-sm w-auto"
                            size="txtPoppinsRegular14Bluegray700"
                          >
                            Nama Lengkap
                          </Text>
                          <Text
                            className="text-red-600 text-sm w-auto"
                            size="txtPoppinsRegular14Red600"
                          >
                            *
                          </Text>
                        </div>
                        <Input
                          placeholder="Andi Nugraha"
                          className="!placeholder:text-gray-900 !text-gray-900 font-poppins p-0 text-base text-left w-full"
                          wrapClassName="border border-gray-400 border-solid w-full bg-transparent"
                          shape="round"
                          color="gray_50"
                          size="md"
                          variant="fill"
                          value={formik.values.fullname}
                          onChange={formik.handleChange("fullname")}
                          errors={formik.errors?.fullname}
                        ></Input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start justify-center w-full">
                  <div className="flex flex-row gap-1 items-center justify-start w-auto">
                    <Text
                      className="text-gray-700 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray700"
                    >
                      Email
                    </Text>
                    <Text
                      className="text-red-600 text-sm w-auto"
                      size="txtPoppinsRegular14Red600"
                    >
                      *
                    </Text>
                  </div>
                  <Input
                    disabled
                    placeholder="andnug@gmail.com"
                    className="!placeholder:text-gray-900 !text-gray-900 font-poppins p-0 text-base text-left w-full"
                    wrapClassName="border border-gray-400 border-solid w-full bg-transparent disabled:bg-gray-100_01"
                    shape="round"
                    color="gray_50"
                    size="md"
                    variant="fill"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    errors={formik.errors?.email}
                  ></Input>
                </div>

                <div className="flex flex-col gap-1 items-start justify-center w-full">
                  <div className="flex flex-row gap-1 items-center justify-start w-auto">
                    <Text
                      className="text-gray-700 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray700"
                    >
                      Nomor Whatsapp
                    </Text>
                    <Text
                      className="text-red-600 text-sm w-auto"
                      size="txtPoppinsRegular14Red600"
                    >
                      *
                    </Text>
                  </div>
                  <Input
                    placeholder="082357282761"
                    className="!placeholder:text-gray-900 !text-gray-900 font-poppins p-0 text-base text-left w-full"
                    wrapClassName="border border-gray-400 border-solid w-[800px] bg-transparent"
                    shape="round"
                    color="gray_50"
                    size="md"
                    variant="fill"
                    value={formik.values.whatsapp_number}
                    onChange={formik.handleChange("whatsapp_number")}
                    errors={formik.errors?.whatsapp_number}
                  ></Input>
                </div>

                <div className="flex flex-col gap-1 items-start justify-center w-full">
                  <div className="flex flex-row gap-1 items-center justify-start w-auto">
                    <Text
                      className="text-gray-700 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray700"
                    >
                      Alamat
                    </Text>
                  </div>

                  <textarea
                    rows={4}
                    placeholder="Alamat saat ini"
                    className="border-gray-400 placeholder-gray-600 font-poppins p-0 text-md text-left py-2 px-2 border rounded-md w-full focus:border-gray-400 whitespace-pre-line"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                  ></textarea>

                  {formik.errors?.address && (
                    <ErrorMessage errors={formik.errors?.address} />
                  )}
                </div>
              </div>

              <button
                className="button-large bg-secondary text-white-A700_01 mt-[33px]"
                onClick={formik.handleSubmit}
              >
                Simpan
              </button>

              {loading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(241,244,249,.7)] flex justify-center items-center rounded-[14px]">
                  <LoadingAnimation />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UbahprofilePage;
