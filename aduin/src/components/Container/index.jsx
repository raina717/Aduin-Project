import FooterPage from "components/Footer";
import Header from "components/Header";
import Header1 from "components/Header1";
import React, { useEffect, useState } from "react";

const Container = ({ children, onPressEnter, withoutSearchInput }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("BEARER_TOKEN");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col font-poppins items-center justify-start mx-auto w-full">
      <div className="flex flex-col items-center justify-start w-full bg-[rgb(248,250,252)]">
        {isLoggedIn ? (
          <Header
            withoutSearchInput={withoutSearchInput}
            onPressEnter={onPressEnter}
            className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full"
          />
        ) : (
          <Header1 className="bg-white-A700 border-b border-gray-200 border-solid flex items-center justify-between md:px-5 px-[72px] py-6 w-full" />
        )}

        {children}

        <FooterPage />
      </div>
    </div>
  );
};

export default Container;
