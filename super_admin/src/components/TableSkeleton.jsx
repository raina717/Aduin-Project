import React from "react";
import Skeleton from "./CardAduan/Skeleton";

const TableSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton height={"37px"} />
      <Skeleton height={"60px"} count={5} />
    </div>
  );
};

export default TableSkeleton;
