import React from "react";
import { Text } from "./Text";

const BadgeStatus = ({ label, isDanger }) => {
  return (
    <div
      className={`w-fit border ${
        isDanger ? "badge-inactive" : "badge-active"
      } rounded px-1.5 py-0.5`}
    >
      <Text
        size=""
        className={`${isDanger ? "text-inactive" : "text-active"} text-xs`}
      >
        {label}
      </Text>
    </div>
  );
};

export default BadgeStatus;
