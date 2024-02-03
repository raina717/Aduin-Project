import React from "react";

import Select from "react-select";
import { ErrorMessage } from "./ErrorMessage";

const SelectPicker = ({ errors, ...props }) => {
  return (
    <>
      <Select
        {...props}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          dropdownIndicator: (base) => ({
            ...base,
            paddingLeft: "4px",
            color: "#718096",
          }),
          clearIndicator: (base) => ({
            ...base,
            paddingLeft: 0,
            paddingRight: 0,
            color: "#718096",
            cursor: "pointer",
          }),
          input: (base, { isDisabled }) => ({
            ...base,
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "16px",
            paddingRight: "16px",
          }),
          singleValue: (base, { isDisabled }) => ({
            ...base,
            color: isDisabled ? "black" : "black",
          }),
          control: (base, { isDisabled }) => ({
            ...base,
            borderColor: "#CBD5E0",
            backgroundColor: isDisabled ? "#F7FAFC" : "white",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#718096",
            fontFamily: "Poppins",
          }),
          ...(props.styles ?? {}),
        }}
      />

      {errors && <ErrorMessage errors={errors} />}
    </>
  );
};

export default SelectPicker;
