import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Input, Text } from "components";
import { useFormik } from "formik";
import { FormLoginScheme } from "utils/FormScheme";
import { authServices } from "services";

import Swal from "sweetalert2";
import Loader from "components/Loader";
import { NavLink } from "react-router-dom";

const MasukPage = () => {
  const [inputType, setInputType] = useState("password");
  const [loading, setLoading] = useState(false);

  // ======== FORMIK =========
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validationSchema: FormLoginScheme,
    onSubmit: (values) => {
      handleLogin(values);
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

  // ======= Navigation =======
  const navigate = useNavigate();

  const onClickSignUp = () => {
    navigate("/daftar");
  };
  // ==========================

  // ====== SERVICE ==========
  const handleLogin = async (payload) => {
    setLoading(true);

    const response = await authServices.login(payload);

    if (response.ok) {
      const data = response?.data?.data;

      if (data?.user?.status === "Inactive") {
        Swal.fire({
          title: "Gagal Masuk",
          text: "Mohon Maaf! Status akun anda inactive, sehingga tidak dapat melanjutkan proses",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Berhasil Masuk",
          icon: "success",
        }).then(() => {
          if (data?.user?.role?.id !== 1) {
            window.location.href = `http://localhost:3001/login?token=${data?.token}`;
          } else {
            localStorage.setItem("BEARER_TOKEN", data?.token);
            localStorage.setItem("USER_PROFILE", JSON.stringify(data?.user));

            window.location.href = "http://localhost:3000/";
          }
        });
      }
    } else {
      Swal.fire({
        title: "Gagal Masuk",
        text:
          response?.data?.response?.data?.message ?? "Something went wrong!",
        icon: "error",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col font-plusjakartasans items-center justify-start mx-auto w-full">
        <div className="bg-white-A700_01 flex flex-col items-center justify-start pb-[51px] w-full">
          <div className="flex flex-col gap-2.5 items-center justify-start w-full">
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between max-w-[1307px] mx-auto md:px-5 w-full">
              <div className="h-[524px] md:h-[534px] md:mt-0 mt-[109px] relative w-[39%] md:w-full">
                <div className="absolute backdrop-opacity-[0.5] bg-deep_purple-A100_0f blur-[350.00px] h-[500px] inset-[0] justify-center m-auto rounded-[50%] w-[500px]"></div>
                <div className="absolute flex flex-col gap-[30px] h-full inset-[0] items-center justify-start m-auto w-auto">
                  <div className="flex flex-col font-poppins gap-2 items-start justify-center w-full">
                    <Text
                      className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-auto"
                      size="txtPoppinsBold40"
                    >
                      Masuk
                    </Text>
                    <Text
                      className="leading-[22.00px] max-w-[360px] md:max-w-full text-base text-gray-500"
                      size="txtPoppinsRegular16Bluegray200"
                    >
                      Masuk dengan email dan kata sandi yang sudah terdaftar
                      sebelumnya
                    </Text>
                  </div>
                  <div className="flex flex-col font-poppins gap-5 items-start justify-start w-full">
                    <div className="flex flex-col gap-[21px] items-start justify-start w-full">
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
                          className="font-opensans p-0 placeholder:text-blue_gray-500 text-base text-left w-full"
                          wrapClassName="w-full"
                          type="email"
                          shape="round"
                          color="blue_gray_100_01"
                          size="md"
                          variant="outline"
                          value={formik.values.email}
                          onChange={formik.handleChange("email")}
                          errors={formik?.errors?.email}
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
                          onChange={formik.handleChange("password")}
                          value={formik.values.password}
                          errors={formik?.errors?.password}
                          type={inputType}
                        ></Input>
                      </div>
                    </div>
                    <div className="flex ml-96 items-end justify-end w-auto">
                      <NavLink to="/lupa-katasandi">
                        <Text
                          className="text-indigo-A200 text-sm w-auto"
                          size="txtPoppinsBold14"
                        >
                          Lupa Kata Sandi?
                        </Text>
                      </NavLink>
                    </div>
                  </div>
                  <div className="flex flex-col font-poppins gap-2.5 items-start justify-start w-full">
                    <Button
                      className="cursor-pointer font-bold h-[50px] text-base text-center w-full"
                      shape="round"
                      color="deep_orange_A200"
                      size="md"
                      variant="fill"
                      onClick={formik.handleSubmit}
                    >
                      Masuk
                    </Button>
                  </div>
                  <div className="flex gap-1 items-center justify-center self-stretch w-auto">
                    <h1
                      className="font-opensans not-italic text-blue_gray-500 text-left tracking-[0.14px] w-auto"
                      onClick={onClickSignUp}
                    >
                      Belum punya akun?
                    </h1>
                    <h1
                      className="font-normal not-italic text-indigo-A200 text-left tracking-[0.14px] w-auto"
                      style={{ cursor: "pointer" }}
                      onClick={onClickSignUp}
                    >
                      Daftar
                    </h1>
                  </div>
                  {/* <Text
                    className="text-black-900 text-center text-sm w-full"
                    size="txtOpenSansBold14"
                  >
                    <span className="text-blue_gray-800 font-poppins font-normal">
                      Belum Punya Akun?
                    </span>
                    <span className="text-black-900 font-poppins font-bold">
                      {" "}
                    </span>
                    <span className="text-indigo-A200 font-poppins font-bold">
                      Daftar
                    </span>
                  </Text> */}
                </div>
              </div>
              <Img
                className="h-[625px] w-[630px] mt-4 md:h-auto object-cover rounded-[40px]"
                src="images/img_rectangle150.png"
                alt="rectangle150"
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </>
  );
};

export default MasukPage;
