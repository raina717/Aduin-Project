import React from "react";
import Skeleton from "./Skeleton";

const LoadingAduan = () => {
  return (
    <div className="card-custom px-4 w-full">
      <div className="flex flex-col w-full space-y-8">
        <div className="flex items-center w-full space-x-2">
          <Skeleton circle wrapperClassname="h-12 w-12" className="h-12 w-12" />

          <div>
            <Skeleton width="200px" height="12px" />

            <Skeleton width="420px" height="10px" />
          </div>
        </div>

        <div className="w-full">
          <Skeleton wrapperClassname="w-full mb-3" width="40%" height="12px" />

          <Skeleton wrapperClassname="w-full" height="12px" count={2} />
        </div>

        <div className="w-full">
          <Skeleton wrapperClassname="w-full mb-3" width="37%" height="10px" />

          <div className="flex overflow-x-auto overflow-y-hidden space-x-2">
            <Skeleton wrapperClassname="w-24 h-24" className="h-24 w-24" />
            <Skeleton wrapperClassname="w-24 h-24" className="h-24 w-24" />
            <Skeleton wrapperClassname="w-24 h-24" className="h-24 w-24" />
          </div>
        </div>

        <div className="w-full flex space-x-4">
          <Skeleton wrapperClassname="w-[10%]" width="100%" height="32px" />
          <Skeleton wrapperClassname="w-[10%]" width="100%" height="32px" />
          <Skeleton wrapperClassname="w-[10%]" width="100%" height="32px" />
          <Skeleton wrapperClassname="w-[10%]" width="100%" height="32px" />
        </div>
      </div>
    </div>
  );
};

export default LoadingAduan;
