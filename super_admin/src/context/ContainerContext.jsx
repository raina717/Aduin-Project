/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { authServices, complainServices } from "services";
import { checkArray } from "utils";

export const ContainerContext = createContext();

const ContainerContextProvider = ({ children }) => {
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const [headerTitle, setHeaderTitle] = useState("");
  const [headerSubMenu, setHeaderSubMenu] = useState([]);
  const [additionalHeader, setAdditionalHeader] = useState(<></>);

  // * Data
  const [komisiList, setKomisiList] = useState([]);
  const [kategoriAduanList, setKategoriAduanList] = useState([]);
  const [profile, setProfile] = useState();

  // * State Filter
  const [kategoriAduan, setKategoriAduan] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [komisi, setKomisi] = useState();

  useEffect(() => {
    fetchInitialize();
  }, []);

  const fetchInitialize = async () => {
    if (!profile && kategoriAduanList.length === 0) {
      const userProfile = await authServices.userProfile();

      if (userProfile?.ok) {
        if (userProfile?.data?.data) {
          setProfile(userProfile.data?.data);
        }
      }

      const [categories, komisi] = await Promise.all([
        complainServices.allCategories(),
        ...(userProfile?.data?.data?.role?.id === 3
          ? [authServices.listKomisi()]
          : []),
      ]);

      if (categories?.ok) {
        if (checkArray(categories?.data?.data)) {
          let filteredData = categories?.data?.data;

          if (userProfile?.data?.data?.sector_id) {
            filteredData = filteredData.filter(
              (d) => userProfile?.data?.data?.sector_id === d?.sector_id
            );
          }

          filteredData = filteredData.map((d) => ({
            value: d.id,
            label: d.name,
            sector: `${d.sector} | ${d.name}`,
            sector_id: d?.sector_id,
          }));

          setKategoriAduanList(filteredData);
        }
      }

      if (userProfile?.data?.data?.role?.id === 3) {
        if (komisi?.ok) {
          if (checkArray(komisi?.data?.data)) {
            setKomisiList(komisi?.data?.data);
          }
        } else {
          setKomisiList([]);
        }
      }
    }
  };

  const handleLogout = () => {
    setLoading(true);

    localStorage.clear();

    window.location.href = "http://localhost:3000/";

    setLoading(false);
  };

  return (
    <ContainerContext.Provider
      value={{
        headerTitle,
        headerSubMenu,
        additionalHeader,
        kategoriAduan,
        searchInput,
        kategoriAduanList,
        isSubMenu,
        profile,
        loading,
        komisiList,
        komisi,
        setKomisi,
        setLoading,
        setIsSubMenu,
        setHeaderTitle,
        setHeaderSubMenu,
        setAdditionalHeader,
        setKategoriAduan,
        setSearchInput,
        setKategoriAduanList,
        handleLogout,
      }}
    >
      {children}
    </ContainerContext.Provider>
  );
};

export default ContainerContextProvider;
