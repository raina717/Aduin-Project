/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import SelectPicker from "./SelectPicker";
import TextInput from "./TextInput";
import { ContainerContext } from "context/ContainerContext";

// * Icon
const Filter = ({
  wrapperClassname,
  searchOnly,
  filterAnggotaDprd,
  onPressEnter,
}) => {
  const {
    kategoriAduan,
    searchInput,
    kategoriAduanList,
    setKategoriAduan,
    setSearchInput,
    komisiList,
    komisi,
    setKomisi,
  } = useContext(ContainerContext);

  useEffect(() => {
    setKategoriAduan(null);
    setSearchInput("");
  }, []);

  return (
    <div className={`flex space-x-4 ${wrapperClassname}`}>
      {searchOnly ? (
        <>
          <TextInput
            useSearchIcon
            id="search"
            wrapperClassname="flex flex-1 w-full relative"
            inputClassname="flex-[0.5] px-10"
            placeholder="Cari nama pengguna disini.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onPressEnter={onPressEnter ? onPressEnter : () => {}}
          />
        </>
      ) : filterAnggotaDprd ? (
        <>
          <SelectPicker
            isClearable
            isSearchable
            value={komisi}
            options={komisiList}
            placeholder="Semua Komisi"
            onChange={(newVal) => {
              setKomisi(newVal);
              setKategoriAduan(null);
            }}
            getOptionLabel={(opt) => opt?.sector_name}
            getOptionValue={(opt) => opt?.id}
            styles={{
              menu: (base) => ({
                ...base,
                width: komisi ?? "150px",
                zIndex: 1000,
              }),
            }}
          />

          <SelectPicker
            isClearable
            isSearchable
            isDisabled={!komisi}
            value={kategoriAduan}
            options={
              komisi
                ? kategoriAduanList.filter((d) => d?.sector_id === komisi?.id)
                : kategoriAduanList
            }
            placeholder="Semua Kategori"
            onChange={(newVal) => setKategoriAduan(newVal)}
            styles={{
              menu: (base) => ({
                ...base,
                width: kategoriAduan ?? "250px",
                zIndex: 1000,
              }),
            }}
          />

          <TextInput
            useSearchIcon
            id="search"
            wrapperClassname="flex flex-1 w-full relative"
            inputClassname="flex-[0.3] px-10"
            placeholder="Cari ID atau Judul Aduan disini.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onPressEnter={onPressEnter}
          />
        </>
      ) : (
        <>
          <SelectPicker
            isClearable
            isSearchable
            value={kategoriAduan}
            options={kategoriAduanList}
            placeholder="Semua Kategori"
            onChange={(newVal) => setKategoriAduan(newVal)}
            styles={{
              menu: (base) => ({
                ...base,
                width: kategoriAduan ?? "250px",
                zIndex: 1000,
              }),
            }}
          />

          <TextInput
            useSearchIcon
            id="search"
            wrapperClassname="flex flex-1 w-full relative"
            inputClassname="flex-[0.3] px-10"
            placeholder="Cari ID atau Judul Aduan disini.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onPressEnter={onPressEnter}
          />
        </>
      )}
    </div>
  );
};

export default Filter;
