/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "components";
import Container from "components/Container";
import React, { useContext, useEffect, useState } from "react";

import TextInput from "components/TextInput";
import RadioBtn from "components/RadioBtn";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

// * Icon
import { ReactComponent as DefaultAvatar } from "../../assets/icon/img_phuser.svg";
import { ReactComponent as EditIcon } from "../../assets/icon/edit_icon.svg";
import { useParams } from "react-router-dom";
import { ContainerContext } from "context/ContainerContext";
import BadgeStatus from "components/BadgeStatus";
import { adminServices } from "services";
import { LoadingAnimation } from "components/Loader";
import { useFormik } from "formik";
import { FormUpdatePenggunaScheme } from "utils/FormSchema";

const DetailPengguna = () => {
  const { penggunaId, penggunaName } = useParams();
  const {
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      status: "",
    },
    validationSchema: FormUpdatePenggunaScheme,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState();
  const [isEdited, setIsEdited] = useState();

  useEffect(() => {
    initializePage();
    fetchInitialize();
  }, []);

  useEffect(() => {
    if (isEdited) {
      setAdditionalHeader(
        <div className="flex space-x-6 items-center">
          <button
            className="button-large bg-white-A700 text-[#2D3748] font-semibold"
            onClick={() => setIsEdited(false)}
          >
            Cancel
          </button>

          <button
            className="button-large bg-secondary text-white-A700 font-semibold"
            onClick={formik.handleSubmit}
          >
            Save
          </button>
        </div>
      );
    } else {
      setAdditionalHeader(
        <div>
          <button
            className="button-large bg-secondary text-white-A700 font-semibold"
            onClick={() => setIsEdited(true)}
          >
            Edit
          </button>
        </div>
      );
    }
  }, [isEdited]);

  const initializePage = () => {
    setHeaderTitle("Pengguna");
    setHeaderSubMenu([penggunaName]);
    setIsSubMenu(true);
  };

  const fetchInitialize = async () => {
    setLoading(true);
    const userProfile = await adminServices.detailUser(penggunaId);
    setLoading(false);

    if (userProfile?.ok) {
      if (userProfile?.data?.data) {
        const { profile_photo, status, fullname } = userProfile?.data?.data;

        formik.setValues({
          fullname,
          status,
        });

        setProfile(userProfile?.data?.data);
        setSelectedProfile(profile_photo);
      }
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    let payload = {
      user_id: Number(penggunaId),
      profile_photo:
        typeof selectedProfile === "string"
          ? selectedProfile.length > 0
            ? selectedProfile
            : ""
          : "",
      fullname: values.fullname,
      whatsapp_number: profile?.whatsapp_number,
      address: profile?.address,
      status: values.status,
    };

    const response = await adminServices.updateAdmin(payload);

    setLoading(false);

    if (response.ok) {
      if (response.data?.success) {
        setIsEdited(false);

        toast("Berhasil edit user", {
          type: "success",
        });

        // fetchInitialize();
      }
    } else {
      Swal.fire({
        title: "Error",
        text: response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <Container withoutFilter wrapperClassname="overflow-auto">
      <section className="card-custom relative">
        <Text size="" className="font-poppins text-xl">
          Informasi Pengguna
        </Text>

        <Text size="" className="mt-4 font-poppins text-sm font-light">
          Foto Profil
        </Text>

        <form className="flex flex-col">
          <label
            htmlFor="avatar"
            className="w-[123px] h-[123px] bg-gray-300 rounded-full flex justify-center items-center mt-2 border border-gray-400 relative cursor-pointer"
          >
            <input
              disabled
              id="avatar"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setSelectedProfile(e.target.files[0]);
                }
              }}
            />

            {selectedProfile ? (
              <div className="relative group">
                <img
                  src={
                    typeof selectedProfile === "string"
                      ? selectedProfile
                      : URL.createObjectURL(selectedProfile)
                  }
                  alt="Selected Profile"
                  className="h-[123px] w-[123px] object-cover rounded-full"
                />

                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-[rgba(240,255,244,0.7)] flex justify-center items-center group-hover:visible invisible">
                  <EditIcon className="fill-primary" />
                  <Text className="text-primary">Edit</Text>
                </div>
              </div>
            ) : (
              <DefaultAvatar className="fill-primary h-[82px] w-[82px]" />
            )}
          </label>

          <div className="mt-6 grid grid-cols-2 gap-6">
            {isEdited ? (
              <TextInput
                required
                id="name"
                name="fullname"
                label="Nama"
                inputClassname="mt-1 px-4"
                placeholder="Masukkan nama pengguna"
                disabled={!isEdited}
                value={formik.values.fullname}
                onChange={formik.handleChange("fullname")}
                errors={formik.errors?.fullname}
              />
            ) : (
              <DetailText label="Nama" detail={profile?.fullname} />
            )}
            <DetailText label="Email" detail={profile?.email ?? "-"} />
            <DetailText
              label="No Whatsapp"
              detail={profile?.whatsapp_number ?? "-"}
            />
            <DetailText
              label="Alamat"
              detail={profile?.address === "" ? "-" : profile?.address}
            />

            {isEdited ? (
              <div>
                <label aria-required className="label">
                  Status
                </label>

                <div className="flex items-center space-x-4 mt-2">
                  <RadioBtn
                    id="status"
                    label="Active"
                    selected={formik.values.status === "Active"}
                    onSelect={() => formik.setFieldValue("status", "Active")}
                    disabled={!isEdited}
                  />

                  <RadioBtn
                    id="status"
                    label="Inactive"
                    selected={formik.values.status === "Inactive"}
                    onSelect={() => formik.setFieldValue("status", "Inactive")}
                    disabled={!isEdited}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <label className="label" aria-required={true}>
                  Status
                </label>

                <BadgeStatus
                  isDanger={formik.values.status === "Inactive"}
                  label={formik.values.status}
                />
              </div>
            )}
          </div>
        </form>

        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.5)] flex justify-center items-center">
            <LoadingAnimation />
          </div>
        )}
      </section>
    </Container>
  );
};

const DetailText = ({ label, detail }) => {
  return (
    <div className="flex flex-col space-y-3">
      <label className="label">{label}</label>

      <Text className="text-gray-900_01">{detail}</Text>
    </div>
  );
};

export default DetailPengguna;
