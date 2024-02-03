import React from "react";

const RadioBtn = ({ id, label, selected, disabled, onSelect }) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        id={id}
        role="radio"
        aria-checked={selected}
        onClick={disabled ? () => {} : onSelect}
        className={`border-2 h-5 w-5 rounded-full flex justify-center items-center ${
          selected ? "border-primary" : "border-gray-500"
        }`}
      >
        <div
          className={`h-2.5 w-2.5 rounded-full ${selected ? "bg-primary" : ""}`}
        />
      </div>

      <label
        htmlFor={id}
        className="text-base font-poppins font-normal text-blue_gray-500"
        onClick={disabled ? () => {} : onSelect}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioBtn;
