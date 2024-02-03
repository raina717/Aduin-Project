import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Input, Text } from "components";
import { useFormik } from "formik";
import { FormRegisterScheme } from "utils/FormScheme";
import Loader from "components/Loader";
import { authServices } from "services";
import Swal from "sweetalert2";

const DaftarPage = () => {
  const [loading, setLoading] = useState(false);

  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  const formik = useFormik({
    initialValues: {
      fullname: "",
      whatsapp_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validateOnChange: true,
    validateOnMount: false,
    validationSchema: FormRegisterScheme,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const onClickEye = (e) => {
    setInputType(inputType === "password" ? "text" : "password");
    setImg(
      inputType === "password"
        ? "https://staging.ina17.com/dcb-lp/image/img_icroundremoveredeye.svg"
        : "https://staging.ina17.com/dcb-lp/image/ic_disable_eye.svg"
    );
  };
  const [srcImg, setImg] = useState(
    "https://staging.ina17.com/dcb-lp/image/ic_disable_eye.svg"
  );

  const onClickEye2 = (e) => {
    setInputType2(inputType === "password" ? "text" : "password");
    setImg2(
      inputType === "password"
        ? "https://staging.ina17.com/dcb-lp/image/img_icroundremoveredeye.svg"
        : "https://staging.ina17.com/dcb-lp/image/ic_disable_eye.svg"
    );
  };
  const [srcImg2, setImg2] = useState(
    "https://staging.ina17.com/dcb-lp/image/ic_disable_eye.svg"
  );

  // ======= Navigation =======
  const navigate = useNavigate();
  const onClickSignIn = () => {
    navigate("/Masuk");
  };
  // ==========================

  // ======== SERVICE =========
  const handleRegister = async (payload) => {
    setLoading(true);

    const response = await authServices.register(payload);

    if (response.ok) {
      setLoading(false);

      return navigate(`/verifikasi-email-terkirim?email=${payload.email}`, {
        state: JSON.stringify(payload),
      });
    } else {
      Swal.fire({
        title: "Gagal Masuk",
        text: response?.data?.response?.data?.message ?? "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col font-plusjakartasans items-center justify-start mx-auto w-full">
        <div className="bg-white-A700_01 flex flex-col items-center justify-start pb-[51px] w-full">
          <div className="flex flex-col gap-2.5 items-center justify-start w-full">
            <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between max-w-[1307px] mx-auto md:px-5 w-full">
              <div className="h-[726px] md:h-[736px] relative w-[39%] md:w-full">
                <div className="absolute backdrop-opacity-[0.5] bg-deep_purple-A100_0f blur-[350.00px] h-[500px] inset-x-[0] mx-auto rounded-[50%] top-[12%] w-[500px]"></div>
                <div className="absolute flex flex-col gap-6 h-full inset-[0] items-start justify-start m-auto w-auto">
                  <div className="flex flex-col font-poppins gap-2 items-start justify-center w-auto">
                    <Text
                      className="sm:text-4xl mt-8 md:text-[38px] text-[40px] text-blue_gray-800 w-auto"
                      size="txtPoppinsBold40"
                    >
                      Daftar
                    </Text>
                    <Text
                      className="leading-[22.00px] max-w-[360px] md:max-w-full text-base text-blue_gray-300"
                      size="txtPoppinsRegular16Bluegray300"
                    >
                      Daftarkan akunmu untuk menikmati semua fitur yang tersedia
                    </Text>
                  </div>
                  <div className="flex flex-col font-poppins gap-4 items-start justify-start w-full">
                    <div className="flex flex-col gap-2 items-start justify-center w-full">
                      <Text
                        className="text-blue_gray-800 text-sm w-auto"
                        size="txtPoppinsRegular14"
                      >
                        Nama Lengkap
                      </Text>
                      <Input
                        name="fullname"
                        placeholder="Nama Lengkap"
                        className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                        wrapClassName="w-full"
                        shape="round"
                        color="blue_gray_100_01"
                        size="md"
                        variant="outline"
                        value={formik.values.fullname}
                        onChange={formik.handleChange("fullname")}
                        errors={formik.errors?.fullname}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-2 items-start justify-center w-full">
                      <Text
                        className="text-blue_gray-800 text-sm w-auto"
                        size="txtPoppinsRegular14"
                      >
                        Nomor Whatsapp
                      </Text>
                      <Input
                        name="whatsapp_number"
                        placeholder="Nomor Whatsapp"
                        className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                        wrapClassName="w-full"
                        shape="round"
                        color="blue_gray_100_01"
                        size="md"
                        variant="outline"
                        value={formik.values.whatsapp_number}
                        onChange={formik.handleChange("whatsapp_number")}
                        errors={formik.errors?.whatsapp_number}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-2 items-start justify-center w-full">
                      <Text
                        className="text-blue_gray-800 text-sm w-auto"
                        size="txtPoppinsRegular14"
                      >
                        Email
                      </Text>
                      <Input
                        name="email"
                        placeholder="Email"
                        className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                        wrapClassName="w-full"
                        type="email"
                        shape="round"
                        color="blue_gray_100_01"
                        size="md"
                        variant="outline"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        errors={formik.errors?.email}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-2 items-start justify-center w-full">
                      <Text
                        className="text-blue_gray-800 text-sm w-auto"
                        size="txtPoppinsRegular14"
                      >
                        Kata Sandi
                      </Text>
                      <Input
                        name="password"
                        placeholder="Kata Sandi"
                        className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                        wrapClassName="flex w-full"
                        suffix={
                          <Img
                            onClick={onClickEye}
                            src={srcImg}
                            className="mt-px mb-auto ml-[35px]"
                            alt="eye"
                          />
                        }
                        shape="round"
                        color="blue_gray_100_01"
                        size="md"
                        variant="outline"
                        type={inputType}
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        errors={formik.errors?.password}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-2 items-start justify-center w-full">
                      <Text
                        className="text-blue_gray-800 text-sm w-auto"
                        size="txtPoppinsRegular14"
                      >
                        Konfirmasi Kata Sandi
                      </Text>
                      <Input
                        name="confirm_password"
                        placeholder="Ulangi Kata Sandi"
                        className="p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                        wrapClassName="flex w-full"
                        suffix={
                          <Img
                            onClick={onClickEye2}
                            src={srcImg2}
                            className="mt-px mb-auto ml-[35px]"
                            alt="eye"
                          />
                        }
                        shape="round"
                        color="blue_gray_100_01"
                        size="md"
                        variant="outline"
                        type={inputType2}
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange("confirm_password")}
                        errors={formik.errors?.confirm_password}
                      ></Input>
                    </div>
                  </div>
                  <div className="flex flex-col font-poppins gap-2.5 items-start justify-start w-auto sm:w-full">
                    <Button
                      className="cursor-pointer font-bold h-[50px] text-base text-center w-[510px]"
                      shape="round"
                      color="deep_orange_A200"
                      size="md"
                      variant="fill"
                      onClick={formik.handleSubmit}
                    >
                      Daftar
                    </Button>
                  </div>
                  <div className="flex gap-1 items-center justify-center self-stretch w-auto">
                    <h1
                      className="font-opensans not-italic text-blue_gray-500 text-left tracking-[0.14px] w-auto"
                      onClick={onClickSignIn}
                    >
                      Sudah punya akun?
                    </h1>
                    <h1
                      className="font-normal not-italic text-indigo-A200 text-left tracking-[0.14px] w-auto"
                      style={{ cursor: "pointer" }}
                      onClick={onClickSignIn}
                    >
                      Masuk
                    </h1>
                  </div>
                </div>
              </div>
              <Img
                className="h-[625px] w-[630px] md:h-auto object-cover rounded-[40px]"
                src="images/img_rectangle150.png"
                alt="rectangle149"
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default DaftarPage;
