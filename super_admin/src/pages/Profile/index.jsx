/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "components";
import Container from "components/Container";
import React, { useContext, useEffect, useState } from "react";

import TextInput from "components/TextInput";

// * Icon
import { ReactComponent as DefaultAvatar } from "../../assets/icon/img_phuser.svg";
import { ReactComponent as EditIcon } from "../../assets/icon/edit_icon.svg";
import { ContainerContext } from "context/ContainerContext";
import { authServices, complainServices } from "services";
import { useFormik } from "formik";
import { FormCreateAdminScheme, FormUpdateAdminScheme } from "utils/FormSchema";
import history from "utils/history";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LoadingAnimation } from "components/Loader";
import BadgeStatus from "components/BadgeStatus";

const Profile = ({ newUser }) => {
  const {
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const [selectedRole, setSelectedRole] = useState();

  const [isEdited, setIsEdited] = useState(newUser);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      status: "Active",
      address: "",
      whatsapp_number: "",
    },
    validateOnChange: true,
    validationSchema: FormUpdateAdminScheme,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    initializePage();
    fetchInitialize();
  }, []);

  useEffect(() => {
    if (isEdited || newUser) {
      setAdditionalHeader(
        <div className="flex space-x-6 items-center">
          <button
            disabled={loading}
            className="button-large bg-white-A700 text-[#2D3748] font-semibold"
            onClick={() => {
              if (newUser) {
                history.back();
              } else {
                setIsEdited(false);
              }
            }}
          >
            Cancel
          </button>

          <button
            disabled={loading}
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
  }, [isEdited, newUser]);

  const initializePage = () => {
    setHeaderTitle("Profile");
    setHeaderSubMenu([]);
    setIsSubMenu(true);
  };

  const fetchInitialize = async () => {
    const userProfile = await authServices.userProfile();

    if (userProfile?.ok) {
      if (userProfile?.data?.data) {
        const { fullname, email, profile_photo, status, role } =
          userProfile?.data?.data;

        formik.setValues({
          fullname: fullname,
          email: email,
          status: status,
          address: "",
          whatsapp_number: "",
        });

        setSelectedProfile(profile_photo);

        setSelectedRole({
          label: role?.role_name,
          value: role?.id,
        });
      }
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    let payload = {
      fullname: values.fullname,
      address: "-",
      whatsapp_number: "-",
      profile_photo: "",
    };

    if (typeof selectedProfile === "string") {
      payload.profile_photo = selectedProfile;
    } else if (selectedProfile !== null) {
      const uploadFile = await complainServices.uploadEvidence({
        file: selectedProfile,
      });

      if (uploadFile.ok) {
        if (uploadFile.data?.data) {
          payload.profile_photo = uploadFile?.data?.data?.url;
        }
      }
    }

    const response = await authServices.updateProfile(payload);

    setLoading(false);
    setIsEdited(false);

    if (response.ok) {
      if (response?.data?.success) {
        toast("Berhasil update profile", {
          type: "success",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: response?.data?.message ?? "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <Container withoutFilter>
      <section className="card-custom relative">
        <Text size="" className="font-poppins text-xl">
          Informasi Umum
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
              disabled={!isEdited}
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

                {isEdited && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full bg-[rgba(240,255,244,0.7)] flex justify-center items-center group-hover:visible invisible">
                    <EditIcon className="fill-primary" />
                    <Text className="text-primary">Edit</Text>
                  </div>
                )}
              </div>
            ) : (
              <DefaultAvatar className="fill-primary h-[82px] w-[82px]" />
            )}
          </label>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <TextInput
              required
              id="name"
              name="fullname"
              label="Nama"
              inputClassname="mt-1 px-4"
              placeholder="Masukkan nama admin"
              disabled={!isEdited}
              value={formik.values?.fullname}
              onChange={formik.handleChange("fullname")}
              {...(isEdited
                ? {
                    errors: formik.errors.fullname,
                  }
                : {})}
            />

            <TextInput
              required
              id="email"
              name="email"
              type="email"
              label="Email"
              inputClassname="mt-1 px-4"
              placeholder="Masukkan Email"
              disabled
              value={formik.values?.email}
              onChange={formik.handleChange("email")}
              {...(isEdited
                ? {
                    errors: formik.errors.email,
                  }
                : {})}
            />

            <div>
              <label aria-required className="label">
                Status
              </label>

              <div className="mt-2">
                <BadgeStatus
                  isDanger={formik.values?.status === "Inactive"}
                  label={formik.values.status}
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="role" aria-required={true} className="label">
                  Role
                </label>

                <Text className="mt-1">{selectedRole?.label}</Text>
              </div>
            </div>
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

export default Profile;
