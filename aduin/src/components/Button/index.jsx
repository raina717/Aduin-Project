import React from "react";
import PropTypes from "prop-types";

const shapes = { round: "rounded-lg", square: "rounded-none" };
const variants = {
  fill: {
    gray_100: "bg-green-100",
    indigo_A200: "bg-indigo-A200",
    deep_orange_A200: "bg-deep_orange-A200 text-white-A700",
    white_A700: "bg-white-A700",
  },
  outline: {
    deep_orange_A200:
      "border border-deep_orange-A200 border-solid text-deep_orange-A200",
  },
};
const sizes = { xs: "p-1", sm: "p-[9px]", md: "p-[13px]" };

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
  shape: PropTypes.oneOf(["round", "square"]),
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "gray_100",
    "indigo_A200",
    "deep_orange_A200",
    "white_A700",
  ]),
};

export { Button };
