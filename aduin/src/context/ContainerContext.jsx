/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState } from "react";

export const ContainerContext = createContext();

const ContainerContextProvider = ({ children }) => {
  // * State Filter
  const [searchInput, setSearchInput] = useState("");

  return (
    <ContainerContext.Provider
      value={{
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};

export default ContainerContextProvider;
