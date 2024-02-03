import React from "react";

export const ErrorMessage = ({ errors = [], className = "" }) => {
  return (
    <div className={`text-red-500 text-left text-xs w-full mt-1 ${className}`}>
      {errors}
    </div>
  );
};
