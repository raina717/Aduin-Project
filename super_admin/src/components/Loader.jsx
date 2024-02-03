import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-[1000]">
      <div
        role="status"
        class="fixed -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      >
        <LoadingAnimation />
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const LoadingAnimation = () => (
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
