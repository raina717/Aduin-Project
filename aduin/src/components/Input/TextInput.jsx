import React from "react";

// * Icon
import { ReactComponent as SearchIcon } from "../../assets/icons/img_materialsymbolslightsearch.svg";

const TextInput = ({
  wrapperClassname,
  inputClassname,
  useSearchIcon,
  customPrefixIcon,
  label,
  ...props
}) => {
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

      <input
        type="text"
        className={`rounded p-0 w-full py-1.5 outline-1 border-[#CBD5E0] focus:border-[#CBD5E0] placeholder-gray-600 font-poppins font-normal disabled:bg-gray-100_01 ${inputClassname}`}
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
          className="absolute bottom-0 top-0 flex justify-center items-center px-3"
        >
          {customPrefixIcon}
        </label>
      )}
    </div>
  );
};

export default TextInput;
