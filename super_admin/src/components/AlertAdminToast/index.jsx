import React from "react";

import { Img, Line, Text } from "components";

const AlertAdminToast = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="bg-red-500 px-3 py-5 relative w-[414px] md:w-full">
          <div className="flex flex-row gap-2 items-center justify-start m-auto w-[382px] sm:w-full">
            <Img
              className="h-6 w-6"
              src="images/img_mdialertcircle.svg"
              alt="mdialertcircle"
            />
            <Text
              className="flex-1 text-base text-white-A700 w-auto"
              size="txtPoppinsMedium16WhiteA700"
            >
              {props?.errormessage}
            </Text>
          </div>
          <Img
            className="absolute h-6 right-[19%] top-[31%] w-6"
            src="images/img_mdiclose.svg"
            alt="mdiclose"
          />
        </div>
        <div className="h-0.5 relative w-full">
          <Line className="bg-red-500 h-0.5 m-auto w-full" />
          <Line className="absolute bg-white-A700 h-0.5 inset-y-[0] left-[0] my-auto w-[22%]" />
        </div>
      </div>
    </>
  );
};

AlertAdminToast.defaultProps = { errormessage: "Data gagal diubah. Coba Lagi" };

export default AlertAdminToast;
