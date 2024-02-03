/* eslint-disable react-hooks/exhaustive-deps */
import { Text } from "components";
import BadgeStatus from "components/BadgeStatus";
import Container from "components/Container";
import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as EditIcon } from "../../assets/icon/edit_icon.svg";

import SelectPicker from "components/SelectPicker";
import { STATUS_OPTIONS } from "utils/constants";
import { ContainerContext } from "context/ContainerContext";
import { useParams } from "react-router-dom";
import { complainServices } from "services";
import CardAduan from "components/CardAduan";
import LoadingAduan from "components/CardAduan/LoadingAduan";
import { checkArray } from "utils";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LoadingAnimation } from "components/Loader";

const DetailDaftarAduan = () => {
  const {
    setHeaderTitle,
    setHeaderSubMenu,
    setAdditionalHeader,
    kategoriAduanList,
    setIsSubMenu,
  } = useContext(ContainerContext);

  const { aduanId } = useParams();

  const [detailComplaint, setDetailComplaint] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializePage();
    fetchInitialize();
  }, []);

  const initializePage = () => {
    setHeaderTitle("Daftar Aduan");
    setHeaderSubMenu([aduanId.split("-")[1]]);
    setAdditionalHeader();
    setIsSubMenu(true);
  };

  const fetchInitialize = async () => {
    const id = aduanId.split("-")[0];

    setLoading(true);

    const response = await complainServices.detailComplaint(id);

    setLoading(false);

    if (response?.ok) {
      if (response?.data?.data) {
        setDetailComplaint(response?.data?.data);
      } else {
        setDetailComplaint(null);
      }
    }
  };

  return (
    <Container withoutFilter wrapperClassname="overflow-auto">
      <section className="flex flex-col space-y-4">
        <div className="card-custom">
          <EditAduan
            complaintId={detailComplaint?.complaint_id}
            status={detailComplaint?.status}
            kategori={detailComplaint?.category}
            kategoriList={kategoriAduanList}
            onSuccess={() => fetchInitialize()}
          />
        </div>

        {!loading && Object.keys(detailComplaint ?? {}).length > 0 ? (
          <CardAduan data={detailComplaint} />
        ) : (
          <LoadingAduan />
        )}
      </section>
    </Container>
  );
};

const EditAduan = ({
  status,
  kategori,
  kategoriList,
  complaintId,
  onSuccess,
}) => {
  const [editAduan, setEditAduan] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedKomisi, setSelectedKomisi] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState(null);

  const [komisiList, setKomisiList] = useState([]);
  const [kategoriKomisi, setKategoriKomisi] = useState([]);

  useEffect(() => {
    initializePage();
  }, [kategori]);

  const initializePage = () => {
    if (status) {
      const findStatus = STATUS_OPTIONS.find((d) => d.value === status);

      if (findStatus) {
        setSelectedStatus(findStatus);
      }
    }

    if (checkArray(kategoriList)) {
      if (kategori) {
        const findKategori = kategoriList.find(
          (d) => d?.value === kategori?.category_id
        );

        if (findKategori) {
          const komisi = findKategori?.sector.split(":")[0]?.trim();

          setSelectedKategori(findKategori);
          setSelectedKomisi({
            label: komisi,
            value: komisi,
          });

          // * Set Kategori Komisi
          const kategori = kategoriList.filter((d) =>
            d?.sector.includes(komisi)
          );

          setKategoriKomisi(kategori);
        }
      }

      const filterKomisi = new Set(
        kategoriList.map((d) => d?.sector.split("|")[0].trim())
      );

      const komisi = [];

      filterKomisi.forEach((d) =>
        komisi.push({
          value: d,
          label: d?.split(":")[0]?.trim(),
        })
      );

      setKomisiList(komisi);
    }
  };

  const handleSelectKomisi = (komisi) => {
    setSelectedKomisi(komisi);
    setSelectedKategori(null);

    const kategori = kategoriList.filter((d) =>
      d?.sector.includes(komisi?.value)
    );

    setKategoriKomisi(kategori);
  };

  const handleSubmit = async () => {
    if (!selectedStatus) {
      return Swal.fire({
        title: "Error",
        text: "Status tidak boleh kosong",
        icon: "error",
      });
    }

    if (!selectedKategori) {
      return Swal.fire({
        title: "Error",
        text: "Ditujukan ke tidak boleh kosong",
        icon: "error",
      });
    }

    if (selectedStatus && selectedKategori) {
      setLoading(true);

      const payload = {
        complaint_id: complaintId,
        category_id: selectedKategori?.value,
        status: selectedStatus?.value,
      };

      const response = await complainServices.editComplain(payload);

      setLoading(false);

      if (response.ok) {
        toast("Berhasil edit aduan", {
          type: "success",
        });

        setEditAduan(false);

        onSuccess();
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-4">
            <Text className="mr-4">Status :</Text>

            {editAduan ? (
              <SelectPicker
                isClearable
                isSearchable
                value={selectedStatus}
                placeholder="Status"
                options={STATUS_OPTIONS}
                onChange={setSelectedStatus}
                styles={{
                  menu: (base) => ({
                    ...base,
                    width: "150px",
                  }),
                }}
              />
            ) : (
              <BadgeStatus
                label={`Aduan ${status}`}
                isDanger={status === "Ditolak"}
              />
            )}
          </div>

          <div className="flex items-center">
            <Text className="mr-4">Ditujukan ke :</Text>

            {editAduan ? (
              <div className="flex items-center space-x-2">
                <SelectPicker
                  isSearchable
                  value={selectedKomisi}
                  placeholder="Ditujukan Ke"
                  options={komisiList}
                  onChange={handleSelectKomisi}
                />

                {selectedKomisi && (
                  <>
                    <Text>-</Text>

                    <SelectPicker
                      isSearchable
                      value={selectedKategori}
                      placeholder="Kategori"
                      options={kategoriKomisi}
                      onChange={setSelectedKategori}
                      styles={{
                        menu: (base) => ({
                          ...base,
                          width: "350px",
                        }),
                      }}
                    />
                  </>
                )}
              </div>
            ) : (
              <Text>{selectedKomisi?.value}</Text>
            )}
          </div>
        </div>

        {!editAduan && (
          <button onClick={() => setEditAduan(true)}>
            <div className="flex space-x-2.5 px-6 py-3 border border-secondary rounded-lg">
              <EditIcon className="fill-secondary" />

              <Text
                size={null}
                className="text-secondary font-poppins font-bold"
              >
                Respon Aduan
              </Text>
            </div>
          </button>
        )}
      </div>

      {editAduan && (
        <div className="flex items-center justify-end space-x-6">
          <button
            className="button-large border border-secondary text-secondary font-semibold flex-[.16]"
            onClick={() => setEditAduan(false)}
          >
            Batal
          </button>

          <button
            className="button-large bg-secondary text-white-A700 font-semibold flex-[.16]"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      )}

      {loading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(255,255,255,0.5)]">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
};

export default DetailDaftarAduan;
