import React from "react";

import { Input, Text } from "components";

const UbahPenggunaStateinput = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col gap-1 items-start justify-center w-full">
          <div className="flex flex-row gap-1 items-center justify-start w-auto">
            <Text
              className="text-gray-700 text-sm w-auto"
              size="txtPoppinsRegular14Bluegray700"
            >
              {props?.label}
            </Text>
            <Text
              className="text-red-600 text-sm w-auto"
              size="txtPoppinsRegular14Red600"
            >
              {props?.three}
            </Text>
          </div>
          <Input
            name="frameThree"
            placeholder="Andre Vijaya"
            className="!placeholder:text-gray-900 !text-gray-900 font-poppins p-0 text-base text-left w-full"
            wrapClassName="border border-gray-400 border-solid w-full"
            shape="round"
            color="gray_50"
            size="xs"
            variant="fill"
          ></Input>
        </div>
      </div>
    </>
  );
};

UbahPenggunaStateinput.defaultProps = { label: "Nama", three: "*" };

export default UbahPenggunaStateinput;
