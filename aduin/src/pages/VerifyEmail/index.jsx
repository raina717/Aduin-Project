/* eslint-disable react-hooks/exhaustive-deps */
import { Img, Text } from "components";
import { LoadingAnimation } from "components/Loader";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authServices } from "services";

import Swal from "sweetalert2";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    const token = searchParams.get("token");

    const response = await authServices.verifyEmail({ token });

    if (response.ok) {
      if (response.data.success) {
        Swal.fire({
          title: "Berhasil Verifikasi Email",
          icon: "success",
        }).then(() => {
          return navigate("/masuk", {
            replace: true,
          });
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: response?.data?.response?.data?.message,
        icon: "error",
      });
    }
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
                  <div className="flex flex-col font-poppins items-start justify-center w-full space-y-6">
                    <div className="flex flex-col space-y-2">
                      <Text
                        className="sm:text-4xl md:text-[38px] text-[40px] text-blue_gray-800 w-auto whitespace-pre-line leading-[44px]"
                        size="txtPoppinsBold40"
                      >
                        Verifikasi Email Dalam Proses...
                      </Text>

                      <Text
                        className="leading-[22.00px] max-w-[360px] md:max-w-full text-base text-blue_gray-300"
                        size="txtPoppinsRegular16Bluegray200"
                      >
                        Jangan tutup tab ini, setelah proses verifikasi selesai
                        anda akan ter-redirect ke halaman utama
                      </Text>
                    </div>

                    <LoadingAnimation />
                  </div>
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
    </>
  );
};

export default VerifyEmail;
