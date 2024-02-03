import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "../../components/ErrorMessage";

const variants = {
  OutlineGray400: "border border-gray_400 border-solid",
  OutlineGray400_1: "bg-white_A700 border-b border-gray_400 border-solid",
  OutlineGray400_2: "bg-gray_200 border border-gray_400 border-solid",
  srcOutlineGray200: "bg-white_A700 outline outline-[1px] outline-gray_200",
};
const shapes = {
  RoundedBorder10: "rounded-[10px]",
  CustomBorderTL10:
    "rounded-bl-[10px] rounded-br-none rounded-tl-[10px] rounded-tr-none",
  CustomBorderTL16:
    "rounded-bl-none rounded-br-none rounded-tl-[16px] rounded-tr-[16px]",
  srcRoundedBorder6: "rounded-md",
};
const sizes = {
  sm: "pb-3.5 pt-2.5 px-2.5",
  md: "p-[13px]",
  lg: "pb-[35px] pt-3.5 px-3.5",
  xl: "p-[19px]",
  smSrc: "p-3",
};

const InputFile = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name,
      placeholder,
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant,
      size,
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      // if (onChange) onChange(e?.target?.value);
      if (onChange) onChange(e?.currentTarget?.files[0]);
    };

    return (
      <>
        <div
          className={`${wrapClassName} 
              ${shapes[shape] || ""} 
              ${variants[variant] || ""} 
              ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        <p>{!!errors && <ErrorMessage errors={errors} />}</p>
      </>
    );
  }
);

InputFile.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf([
    "RoundedBorder10",
    "CustomBorderTL10",
    "CustomBorderTL16",
    "srcRoundedBorder6",
  ]),
  variant: PropTypes.oneOf([
    "OutlineGray400",
    "OutlineGray400_1",
    "OutlineGray400_2",
    "srcOutlineGray200",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "smSrc"]),
};

InputFile.defaultProps = {
  wrapClassName: "",
  className: "",
  name: "",
  placeholder: "",
  type: "text",
  shape: "",
  variant: "",
  size: "",
};

export { InputFile };
