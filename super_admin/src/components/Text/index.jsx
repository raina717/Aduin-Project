import React from "react";

const sizeClasses = {
  txtPoppinsRegular16Bluegray500: "font-normal font-poppins",
  txtPoppinsLight12: "font-light font-poppins",
  txtPoppinsSemiBold16IndigoA200: "font-poppins font-semibold",
  txtPoppinsMedium16IndigoA200: "font-medium font-poppins",
  txtPoppinsRegular14Bluegray800: "font-normal font-poppins",
  txtPoppinsRegular14Bluegray700: "font-normal font-poppins",
  txtPoppinsRegular12Bluegray400: "font-normal font-poppins",
  txtPoppinsMedium16WhiteA700: "font-medium font-poppins",
  txtPoppinsRegular14: "font-normal font-poppins",
  txtPoppinsRegular16Gray90001: "font-normal font-poppins",
  txtPoppinsRegular14Red600: "font-normal font-poppins",
  txtPoppinsRegular12WhiteA700: "font-normal font-poppins",
  txtPlusJakartaSansBold3574: "font-bold font-plusjakartasans",
  txtPoppinsRegular16: "font-normal font-poppins",
  txtPoppinsRegular12: "font-normal font-poppins",
  txtPoppinsSemiBold16: "font-poppins font-semibold",
  txtPoppinsMedium12: "font-medium font-poppins",
  txtPoppinsSemiBold20: "font-poppins font-semibold",
  txtPoppinsMedium20: "font-medium font-poppins",
  txtPoppinsMedium16Bluegray900: "font-medium font-poppins",
  txtPoppinsSemiBold12: "font-poppins font-semibold",
  txtPoppinsSemiBold16Gray90001: "font-poppins font-semibold",
  txtPoppinsMedium16: "font-medium font-poppins",
  txtPoppinsSemiBold12DeeporangeA200: "font-poppins font-semibold",
};

const Text = ({
  children,
  className = "",
  size = "txtPoppinsRegular16",
  as,
  ...restProps
}) => {
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
