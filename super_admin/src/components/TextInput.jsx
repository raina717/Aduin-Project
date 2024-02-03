import React, { useState } from "react";

// * Icon
import { ReactComponent as SearchIcon } from "../assets/icon/img_materialsymbolslightsearch.svg";
import { ErrorMessage } from "./ErrorMessage";

const IconEye =
  "https://staging.ina17.com/dcb-lp/image/img_icroundremoveredeye.svg";
const IconEyeClosed =
  "https://staging.ina17.com/dcb-lp/image/ic_disable_eye.svg";

const TextInput = ({
  wrapperClassname,
  inputClassname,
  useSearchIcon,
  customPrefixIcon,
  label,
  onPressEnter,
  iconClassname,
  isPassword,
  errors,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={wrapperClassname}>
      {label && (
        <label
          htmlFor={props.id}
          className="font-poppins text-sm font-light"
          aria-required={props.required}
        >
          {label}
        </label>
      )}

      <div className={`relative ${wrapperClassname}`}>
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          className={`rounded p-0 w-full py-1.5 outline-1 border-[#CBD5E0] focus:border-[#CBD5E0] placeholder-gray-600 font-poppins font-normal disabled:bg-gray-100_01 ${inputClassname}`}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onPressEnter();
            }
          }}
          {...props}
        />

        {useSearchIcon && (
          <label
            htmlFor={props.id}
            className="absolute bottom-0 top-0 flex justify-center items-center px-3"
          >
            <SearchIcon className="fill-gray-600" />
          </label>
        )}

        {customPrefixIcon && (
          <label
            htmlFor={props.id}
            className={`absolute bottom-0 top-0 flex justify-center items-center px-3`}
          >
            {customPrefixIcon}
          </label>
        )}

        {isPassword && (
          <div
            className={`absolute bottom-0 top-1 right-4 flex justify-center items-center`}
          >
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={!showPassword ? IconEyeClosed : IconEye}
                alt="eye icon"
              />
            </button>
          </div>
        )}
      </div>

      {errors && <ErrorMessage errors={errors} />}
    </div>
  );
};

export default TextInput;
