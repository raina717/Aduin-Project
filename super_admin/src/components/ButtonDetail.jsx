import React from "react";

import { useNavigate } from "react-router-dom";

// * Icon
import { ReactComponent as ArrowIcon } from "../assets/icon/img_arrowdown.svg";

const ButtonDetail = ({ path, className, disabled }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      disabled={disabled}
      className={`${className} outline-1 outline outline-secondary rounded p-2 group hover:bg-secondary transition-all duration-200 ease-in-out`}
    >
      <ArrowIcon className="fill-secondary rotate-[-90deg] group-hover:fill-white-A700" />
    </button>
  );
};

export default ButtonDetail;
