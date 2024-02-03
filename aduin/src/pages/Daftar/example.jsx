import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Input, Text } from "components";
import { useFormik } from "formik";
import { FormRegisterScheme } from "utils/FormScheme";

const DaftarPage = () => {
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");

  // ====== FORMIK ======
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: "",
      whatsapp_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validateOnChange: true,
    validationSchema: FormRegisterScheme,
    onSubmit: (values) => {
      console.log("log values register", values);
    },
  });
  // ===================

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
    navigate("/masuk");
  };
  // ==========================

  return (
    <div className="container p-[50px] mx-auto h-screen">
      <div className="flex h-full overflow-hidden">
        <div className="flex flex-col flex-1 justify-center">
          <div className="flex flex-col w-[360px] mx-auto space-y-6 h-full overflow-auto no-scrollbar">
            <div>
              <Text
                size=""
                className="font-bold font-poppins text-[#344054] text-[40px]"
              >
                Daftar
              </Text>

              <Text size="" className="font-normal font-poppins text-[#97A3B6]">
                Daftarkan akunmu untuk menikmati semua fitur yang tersedia
              </Text>
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <Text
                  className="text-blue_gray-800 text-sm w-auto mb-2"
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
                  errors={formik?.errors?.fullname}
                ></Input>
              </div>
              <div>
                <Text
                  className="text-blue_gray-800 text-sm w-auto mb-2"
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
                  errors={formik?.errors?.whatsapp_number}
                ></Input>
              </div>
              <div>
                <Text
                  className="text-blue_gray-800 text-sm w-auto mb-2"
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
                  errors={formik?.errors?.email}
                ></Input>
              </div>
              <div>
                <Text
                  className="text-blue_gray-800 text-sm w-auto mb-2"
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
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  errors={formik?.errors?.password}
                  type={inputType}
                ></Input>
              </div>
              <div>
                <Text
                  className="text-blue_gray-800 text-sm w-auto mb-2"
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
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange("confirm_password")}
                  errors={formik?.errors?.confirm_password}
                  type={inputType2}
                ></Input>
              </div>
            </div>

            {/* Button Daftar */}
            <button className="button-large bg-secondary text-white-A700_01 font-bold w-full">
              Daftar
            </button>

            <div className="flex justify-center">
              <span className="font-poppins text-[#344054]">
                Sudah punya akun?{" "}
                <button className="text-primary font-semibold">Masuk</button>
              </span>
            </div>
          </div>
        </div>

        <div>
          <Img
            className="rounded-[40px] h-full w-auto object-cover"
            src="images/img_rectangle150.png"
            alt="rectangle149"
          />
        </div>
      </div>
    </div>
  );
};

export default DaftarPage;
