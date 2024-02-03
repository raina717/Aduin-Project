import React from "react";

const sizeClasses = {
  txtPoppinsBold16: "font-bold font-poppins",
  txtPoppinsRegular16Bluegray300: "font-normal font-poppins",
  txtPoppinsRegular16Bluegray400: "font-normal font-poppins",
  txtPoppinsLight12: "font-light font-poppins",
  txtPoppinsRegular16Bluegray200: "font-normal font-poppins",
  txtPoppinsMedium16IndigoA200: "font-medium font-poppins",
  txtPoppinsRegular14Lime800: "font-normal font-poppins",
  txtPoppinsRegular14Red600: "font-normal font-poppins",
  txtPoppinsRegular20IndigoA200: "font-normal font-poppins",
  txtPoppinsBold14: "font-bold font-poppins",
  txtPoppinsRegular10: "font-normal font-poppins",
  txtPoppinsSemiBold16Gray900: "font-poppins font-semibold",
  txtPoppinsRegular12: "font-normal font-poppins",
  txtPoppinsSemiBold16: "font-poppins font-semibold",
  txtPoppinsMedium12: "font-medium font-poppins",
  txtPoppinsSemiBold32: "font-poppins font-semibold",
  txtPlusJakartaSansBold146: "font-bold font-plusjakartasans",
  txtPoppinsMedium16: "font-medium font-poppins",
  txtPoppinsRegular14Bluegray400: "font-normal font-poppins",
  txtPoppinsRegular14Bluegray200: "font-normal font-poppins",
  txtPoppinsBold40: "font-bold font-poppins",
  txtPoppinsRegular18: "font-normal font-poppins",
  txtPoppinsRegular14Bluegray700: "font-normal font-poppins",
  txtOpenSansBold14: "font-bold font-opensans",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtPoppinsSemiBold24: "font-poppins font-semibold",
  txtPoppinsMedium24: "font-medium font-poppins",
  txtPoppinsSemiBold24Gray900: "font-poppins font-semibold",
  txtPoppinsMedium20: "font-medium font-poppins",
  txtPlusJakartaSansBold4954: "font-bold font-plusjakartasans",
  txtPoppinsRegular20: "font-normal font-poppins",
  txtPlusJakartaSansBold28: "font-bold font-plusjakartasans",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
