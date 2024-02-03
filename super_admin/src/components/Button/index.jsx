import React from "react";
import PropTypes from "prop-types";

const shapes = { circle: "rounded-[50%]", round: "rounded" };
const variants = {
  fill: {
    white_A700: "bg-white-A700 text-gray-800",
    gray_50_01: "bg-red-100 text-red-600",
    gray_100: "bg-green-100 text-green-600",
    deep_orange_A200: "bg-deep_orange-A200 text-white-A700",
    indigo_50: "bg-gray-300",
  },
};
const sizes = { xs: "p-1", sm: "p-2", md: "p-[13px]" };

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round"]),
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf([
    "white_A700",
    "gray_50_01",
    "gray_100",
    "deep_orange_A200",
    "indigo_50",
  ]),
};

export { Button };
