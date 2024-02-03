import React from "react";

import SkeletonComponent from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = ({ wrapperClassname, ...props }) => {
  return (
    <div className={wrapperClassname}>
      <SkeletonComponent {...props} />
    </div>
  );
};

export default Skeleton;
