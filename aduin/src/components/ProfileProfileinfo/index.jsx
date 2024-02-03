import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Img, Text } from "components";

const ProfileProfileinfo = (props) => {
  const navigate = useNavigate();
    const onClickChangeData = () => {
      navigate("/" + 'Ubahprofile');
    };

  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-[9px] items-center justify-between w-full">
          <div className="flex flex-row gap-2 items-start justify-start w-auto">
            <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
              <Img
                className="h-12 md:h-auto rounded-[50%] w-12"
                src="images/img_ellipse89.png"
                alt="ellipseEightyNine_One"
              />
            </div>
            <div className="flex flex-col gap-[-5px] h-12 md:h-auto items-start justify-between">
              <Text
                className="text-base text-gray-800 w-auto"
                size="txtPoppinsMedium16"
              >
                Andi Nugraha
              </Text>
              <Text
                className="text-gray-600 text-sm w-auto"
                size="txtPoppinsRegular14Bluegray400"
              >
                andinugraha@gmail.com
              </Text>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center justify-start w-auto">
            <div className="flex flex-col gap-0.5 items-center justify-center w-auto">
              <Text
                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[0.50px] w-auto"
                size="txtPoppinsSemiBold24Gray900"
              >
                123
              </Text>
              <Text
                className="text-[10px] text-gray-700 tracking-[0.25px] w-auto"
                size="txtPoppinsRegular10"
              >
               Total
              </Text>
            </div>
            <div className="flex flex-col gap-0.5 items-center justify-center w-auto">
              <Text
                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[0.50px] w-auto"
                size="txtPoppinsSemiBold24Gray900"
              >
                7
              </Text>
              <Text
                className="text-[10px] text-gray-700 tracking-[0.25px] w-auto"
                size="txtPoppinsRegular10"
              >
                Belum
              </Text>
            </div>
            <div className="flex flex-col gap-0.5 items-center justify-center w-auto">
              <Text
                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[0.50px] w-auto"
                size="txtPoppinsSemiBold24Gray900"
              >
                34
              </Text>
              <Text
                className="text-[10px] text-gray-700 tracking-[0.25px] w-auto"
                size="txtPoppinsRegular10"
              >
                Diproses
              </Text>
            </div>
            <div className="flex flex-col gap-0.5 items-center justify-center w-auto">
              <Text
                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[0.50px] w-auto"
                size="txtPoppinsSemiBold24Gray900"
              >
                23
              </Text>
              <Text
                className="text-[10px] text-gray-700 tracking-[0.25px] w-auto"
                size="txtPoppinsRegular10"
              >
                Selesai
              </Text>
            </div>
          </div>
          <Button
            className="cursor-pointer font-bold font-poppins h-[50px] text-base text-center"
            shape="round"
            color="deep_orange_A200"
            size="md"
            variant="outline"
            onClick={onClickChangeData}
          >
            Ubah Data
          </Button>
        </div>
      </div>
    </>
  );
};



export default ProfileProfileinfo;
