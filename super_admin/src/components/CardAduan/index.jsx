/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import DetailAduan from "./DetailAduan";
import TabsAduan from "./TabsAduan";
import CommentSection from "./CommentSection";
import { complainServices } from "services";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import TextInput from "components/TextInput";

const CardAduan = ({ data }) => {
  const originPath = window.location.origin;

  const urlRef = useRef();
  const aduanCompRef = useRef();

  const [activeTab, setActiveTab] = useState("");

  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingSubmitComment, setLoadingSubmitComment] = useState(false);
  const [success, setSuccess] = useState(false);

  const [detailAduan, setDetailAduan] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (activeTab !== "") {
      fetchDetailAduan();
    }
  }, [activeTab]);

  const fetchDetailAduan = async () => {
    setLoadingDetail(true);

    const response = await complainServices.detailComplaint(data?.complaint_id);

    setLoadingDetail(false);

    if (response.ok) {
      if (response?.data?.data) {
        return setDetailAduan(response?.data?.data);
      }
    }

    return setDetailAduan(null);
  };

  const handleSubmitComment = async () => {
    try {
      // ** Check Validation
      if (comment === "" && comment.length < 10) {
        return Swal.fire({
          title: "Gagal Kirim Komentar",
          text: "Komentar tidak boleh kosong dan minimal input 10 kata",
          icon: "error",
        });
      }

      const payload = {
        complaint_id: data?.complaint_id,
        description: JSON.parse(comment),
      };

      setLoadingSubmitComment(true);

      const response = await complainServices[
        activeTab === "Tindakan" ? "addResponse" : "addComment"
      ](payload);

      setLoadingSubmitComment(false);

      if (response.ok) {
        setSuccess(true);

        Swal.fire({
          title: "Berhasil",
          text: "Berhasil membuat komentar baru",
          icon: "success",
        });

        setTimeout(() => {
          setSuccess(false);
        }, 300);

        await fetchDetailAduan();
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message ?? "Something went wrong",
          icon: "danger",
        });
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleAddLike = async () => {
    const response = await complainServices.addLike(data?.complaint_id);

    if (response.ok) {
      setTimeout(() => {
        fetchDetailAduan();
      }, 300);
    } else {
      return Swal.fire({
        title: "Error",
        text: response?.data?.message ?? "Something Went Wrong",
        icon: "error",
      });
    }
  };

  const handleCopyUrl = async (text) => {
    await navigator.clipboard.writeText(text).then(async () => {
      const response = await complainServices.countShare(data?.complaint_id);

      if (response.ok) {
        fetchDetailAduan();
      }

      toast("Berhasil salin tautan", {
        closeButton: true,
        type: "success",
        position: "bottom-right",
        theme: "colored",
      });
    });
  };

  return (
    <div
      ref={aduanCompRef}
      id={`#${data?.complaint_num}`}
      className="card-custom px-4 flex flex-col"
    >
      <div className="flex flex-col space-y-8">
        <DetailAduan data={data} />

        <TabsAduan
          activeTab={activeTab}
          onChangeTab={(selectedTab) => {
            if (selectedTab === "Suka") {
              handleAddLike();
            } else {
              setActiveTab(activeTab === selectedTab ? "" : selectedTab);
            }
          }}
          data={detailAduan ?? data}
        />
      </div>

      {(activeTab === "Tindakan" || activeTab === "Komentar") && (
        <CommentSection
          isLoading={!detailAduan && loadingDetail}
          data={
            activeTab === "Komentar"
              ? detailAduan?.comments
              : detailAduan?.responses
          }
          type={activeTab}
          handleInput={setComment}
          handleSubmit={handleSubmitComment}
          loadingSubmit={loadingSubmitComment}
          success={success}
          profilePhoto={data?.submited_by?.profile_photo}
        />
      )}

      {activeTab === "Bagikan" && (
        <div className="p-6 flex items-center space-x-4">
          <TextInput
            readOnly
            ref={urlRef}
            wrapperClassname="flex flex-1"
            inputClassname="px-4 text-gray-900_01 bg-gray-50"
            value={originPath + `/${data?.complaint_num}`}
          />

          <div>
            <button
              className="border border-secondary px-4 py-2 rounded text-secondary font-poppins font-semibold text-sm hover:bg-secondary hover:text-white-A700 transition-all duration-300 ease-in-out"
              onClick={() =>
                handleCopyUrl(
                  originPath +
                    `/detail/${data?.complaint_id}-${data?.complaint_num}`
                )
              }
            >
              Salin Tautan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAduan;
