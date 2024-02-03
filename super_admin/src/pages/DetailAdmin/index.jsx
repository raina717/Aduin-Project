/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "components";
import Container from "components/Container";
import React, { useContext, useEffect, useState } from "react";

import TextInput from "components/TextInput";
import SelectPicker from "components/SelectPicker";
import RadioBtn from "components/RadioBtn";

// * Icon
import { ReactComponent as DefaultAvatar } from "../../assets/icon/img_phuser.svg";
import { ReactComponent as EditIcon } from "../../assets/icon/edit_icon.svg";
import { useParams } from "react-router-dom";
import { ContainerContext } from "context/ContainerContext";
import { adminServices, authServices, complainServices } from "services";
import { checkArray } from "utils";
import { useFormik } from "formik";
import { FormCreateAdminScheme, FormUpdateAdminScheme } from "utils/FormSchema";
import history from "utils/history";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { LoadingAnimation } from "components/Loader";

const RolesList = [
  {
    value: 2,
    label: "Super Admin",
  },
  {
    value: 3,
    label: "Anggota DPRD",
  },
  {
    value: 4,
    label: "Admin DPRD",
  },
];

const DetailAdmin = ({ newUser }) => {
  const { adminId, adminName } = useParams();

  const {
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [selectedKomisi, setSelectedKomisi] = useState();

  const [isEdited, setIsEdited] = useState(newUser);

  const [listKomisi, setListKomisi] = useState([]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirm_password: "",
      status: "Active",
      role_id: null,
      sector_id: null,
    },
    validateOnChange: true,
    validationSchema: newUser ? FormCreateAdminScheme : FormUpdateAdminScheme,
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
    setHeaderTitle("Admin");
    setHeaderSubMenu([newUser ? "Tambahkan Admin" : adminName]);
    setIsSubMenu(true);
  };

  const fetchInitialize = async () => {
    const response = await authServices.listKomisi();

    if (response.ok) {
      if (checkArray(response?.data?.data)) {
        const data = response?.data?.data;

        setListKomisi(data);
      }
    }

    if (!newUser) {
      const userProfile = await adminServices.detailUser(adminId);

      if (userProfile?.ok) {
        if (userProfile?.data?.data) {
          const { fullname, email, profile_photo, status, role, sector_id } =
            userProfile?.data?.data;

          formik.setValues({
            fullname: fullname,
            email: email,
            status: status,
            role_id: role?.id,
            sector_id,
          });

          setSelectedProfile(profile_photo);

          setSelectedRole({
            label: role?.role_name,
            value: role?.id,
          });

          if (sector_id) {
            const findKomisi = response?.data?.data.find(
              (d) => d?.id === sector_id
            );

            setSelectedKomisi(findKomisi);
          }
        }
      }
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    if (newUser) {
      let path = "";

      if (selectedProfile) {
        const uploadResult = await complainServices.uploadEvidence({
          file: selectedProfile,
        });

        if (uploadResult.ok) {
          if (uploadResult?.data?.data?.path) {
            path = uploadResult?.data?.data?.url;
          }
        }
      }

      const payload = {
        ...values,
        profile_photo: path,
      };

      const response = await adminServices.createAdmin(payload);

      setLoading(false);

      if (response.ok) {
        if (response?.data?.success) {
          toast("Admin berhasil dibuat", {
            type: "success",
          });

          history.back();
        }
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message ?? "Something went wrong",
          icon: "error",
        });
      }
    } else {
      let payload = {
        user_id: Number(adminId),
        fullname: values.fullname,
        whatsapp_number: "-",
        address: "-",
        sector_id: values.sector_id,
        status: values.status,
      };

      // * Check Profile Changed or Not
      if (typeof selectedProfile === "string") {
        payload.profile_photo = selectedProfile;
      } else {
        let path = "";

        if (selectedProfile) {
          const uploadResult = await complainServices.uploadEvidence({
            file: selectedProfile,
          });

          if (uploadResult.ok) {
            if (uploadResult?.data?.data?.path) {
              path = uploadResult?.data?.data?.url;
            }
          }
        }

        payload.profile_photo = path;
      }

      const response = await adminServices.updateAdmin(payload);

      setLoading(false);

      if (response.ok) {
        if (response?.data?.success) {
          toast("Admin berhasil diedit", {
            type: "success",
          });

          history.back();
        }
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message ?? "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  return (
    <Container withoutFilter>
      <section className="card-custom relative">
        <Text size="" className="font-poppins text-xl">
          Informasi Admin
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
              disabled={!isEdited}
              value={formik.values?.email}
              onChange={formik.handleChange("email")}
              {...(isEdited
                ? {
                    errors: formik.errors.email,
                  }
                : {})}
            />

            {newUser && (
              <>
                <TextInput
                  required
                  isPassword
                  id="password"
                  name="password"
                  label="Password"
                  inputClassname="mt-1 px-4"
                  placeholder="Masukkan Password"
                  disabled={!isEdited}
                  value={formik.values?.password}
                  onChange={formik.handleChange("password")}
                  {...(isEdited
                    ? {
                        errors: formik.errors.password,
                      }
                    : {})}
                />

                <TextInput
                  required
                  isPassword
                  id="confirm_password"
                  name="confirm_password"
                  label="Konfirmasi Password"
                  inputClassname="mt-1 px-4"
                  placeholder="Masukkan Konfirmasi Password"
                  disabled={!isEdited}
                  value={formik.values?.confirm_password}
                  onChange={formik.handleChange("confirm_password")}
                  {...(isEdited
                    ? {
                        errors: formik.errors.confirm_password,
                      }
                    : {})}
                />
              </>
            )}

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

            <div>
              <div>
                <label htmlFor="role" aria-required={true} className="label">
                  Role
                </label>

                <SelectPicker
                  isDisabled={!isEdited}
                  id="role"
                  placeholder="Pilih Role (Peran)"
                  options={RolesList}
                  className="mt-1"
                  menuPlacement="top"
                  errors={formik.errors?.role_id}
                  value={selectedRole}
                  onChange={(obj) => {
                    setSelectedRole(obj);
                    formik.setValues({
                      ...formik.values,
                      role_id: obj?.value,
                      ...(obj?.value === 3 ? { sector_id: null } : {}),
                    });

                    if (obj?.value === 3) {
                      setSelectedKomisi(null);
                    }
                  }}
                />
              </div>

              {selectedRole?.value !== 3 && selectedRole?.value !== 2 && (
                <div className="mt-6">
                  <label
                    htmlFor="komisi"
                    aria-required={true}
                    className="label"
                  >
                    Komisi
                  </label>

                  <SelectPicker
                    isClearable
                    isSearchable
                    isDisabled={
                      !isEdited || selectedRole?.value === 3 || !selectedRole
                    }
                    id="komisi"
                    placeholder="Pilih Komisi"
                    options={listKomisi}
                    getOptionLabel={(d) => d?.sector_name}
                    getOptionValue={(d) => d?.id}
                    className="mt-1"
                    menuPlacement="top"
                    errors={formik.errors?.sector_id}
                    value={selectedKomisi}
                    onChange={(obj) => {
                      setSelectedKomisi(obj);
                      formik.setFieldValue("sector_id", obj?.id);
                    }}
                  />
                </div>
              )}
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

export default DetailAdmin;
