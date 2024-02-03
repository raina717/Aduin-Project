import React, { useEffect, useState } from "react";
import { Img, Text } from "components";

import Loader from "components/Loader";
import { useSearchParams } from "react-router-dom";
import { authServices } from "services";
import Swal from "sweetalert2";
import moment from "moment";
import { NavLink } from "react-router-dom";

let interval;

const VerifikasiEmail = () => {
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(0);
  const [play, setPlay] = useState(false);
  const [playDate, setPlayDate] = useState();

  useEffect(() => {
    if (play) {
      interval = setInterval(() => getTime(playDate), 1000);
    }

    return () => clearInterval(interval);
  }, [play, playDate]);

  const getTime = (date) => {
    const time = Date.parse(date) - Date.now();

    const second = Math.floor((time / 1000) % 60);

    if (second < 0) {
      clearInterval(interval);
    } else {
      setTimer(second);
    }
  };

  const handleResend = async () => {
    setLoading(true);

    const response = await authServices.resendVerifyEmail({
      email: searchParams.get("email"),
    });

    setLoading(false);

    if (response.ok) {
      if (response.data?.success) {
        setPlay(true);
        setPlayDate(moment().add(1, "minute"));

        Swal.fire({
          title: "Berhasil Kirim Ulang Email",
          text: "Cek email anda untuk memeriksa link verifikasi anda",
          icon: "success",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
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
                        {`Verifikasi Email\nAnda`}
                      </Text>
                      <Text
                        className="leading-[22.00px] max-w-[360px] md:max-w-full text-base text-blue_gray-300"
                        size="txtPoppinsRegular16Bluegray200"
                      >
                        Permintaan verifikasi email telah dikirim ke{" "}
                        <span className="font-semibold italic">
                          {searchParams.get("email")}
                        </span>
                      </Text>
                      <Text
                        className="leading-[22.00px] max-w-[360px] md:max-w-full text-base text-blue_gray-300"
                        size="txtPoppinsRegular16Bluegray200"
                      >
                        Klik link verifikasi email di email terakhir yang kamu
                        terima dari admin@aduin.info
                      </Text>
                      <Text
                        className="leading-[22.00px] max-w-[360px] md:max-w-full text-base text-blue_gray-300"
                        size="txtPoppinsRegular16Bluegray200"
                      >
                        Apabila tidak ada, anda bisa cek folder spam atau kirim
                        ulang email
                      </Text>
                    </div>

                    <div className="w-full">
                      <button
                        disabled={timer !== 0}
                        className="button-large bg-secondary text-white-A700_01 w-[70%] disabled:bg-gray-300 disabled:text-gray-600"
                        onClick={handleResend}
                      >
                        Kirim Ulang Email
                      </button>

                      {timer > 0 && (
                        <div className="flex justify-center mt-2 w-[70%]">
                          <Text>00:{timer}</Text>
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <div className="w-[70%] block mx-auto">
                        <span className="font-poppins font-normal text-[#344054] text-sm">
                          Sudah punya akun?{" "}
                          <NavLink to="/masuk">
                            <button className="text-primary font-semibold">
                              Masuk
                            </button>
                          </NavLink>
                        </span>
                      </div>
                    </div>
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

      {loading && <Loader />}
    </>
  );
};

export default VerifikasiEmail;
