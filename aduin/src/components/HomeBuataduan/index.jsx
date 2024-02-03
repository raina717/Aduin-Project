import React, { useRef, useState } from "react";
import { Button, Img, Input, SelectBox, Text, List } from "components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoadingAnimation } from "components/Loader";
import { complainServices } from "services";
import { checkArray } from "utils";
import { useFormik } from "formik";
import { FormCreateComplaintScheme } from "utils/FormScheme";
import RadioBtn from "components/RadioBtn";
import { ErrorMessage } from "components/ErrorMessage";

import Swal from "sweetalert2";
import moment from "moment";

import { ReactComponent as AddIcon } from "../../assets/icons/add_icon.svg";
import { ReactComponent as ReplaceIcon } from "../../assets/icons/replace_icon.svg";

const HomeBuataduan = ({ className, complaintCategories, onSuccess }) => {
  const imageRef = useRef();
  const videoRef = useRef();

  const [imagesFiles, setImagesFiles] = useState(null);
  const [videoFiles, setVideoFiles] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editedId, setEditedId] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      category_id: null,
      is_anonymous: false,
    },
    validationSchema: FormCreateComplaintScheme,
    validateOnBlur: true,
    onSubmit: (values) => {
      validateBeforeSubmit(values);
    },
  });

  // =========== FUNCTIONALITY ============
  const handleDeleteFile = (itemId, files, callback) => {
    setLoadingDelete(true);

    if (files !== null) {
      const dt = new DataTransfer();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (itemId !== i) {
          dt.items.add(file);
        }
      }

      setTimeout(() => {
        callback(dt.files);
        setLoadingDelete(false);
      }, 2000);
    }
  };

  const handleAddFile = (files, existingFiles, callback) => {
    setLoadingDelete(true);
    const dt = new DataTransfer();

    for (let i = 0; i < existingFiles.length; i++) {
      const file = existingFiles[i];

      dt.items.add(file);
    }

    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        dt.items.add(file);
      }

      setTimeout(() => {
        callback(dt.files);
        setLoadingDelete(false);
      }, 2000);
    }
  };

  const handleEditFile = (files, editedFiles, callback) => {
    setLoadingDelete(true);

    if (files !== null) {
      const dt = new DataTransfer();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (editedId === i) {
          dt.items.add(editedFiles);
        } else {
          dt.items.add(file);
        }
      }

      setTimeout(() => {
        callback(dt.files);
        setLoadingDelete(false);
      }, 2000);
    }
  };

  const validateBeforeSubmit = async (payload) => {
    setLoading(true);

    let reqPayload = payload;

    // * Check Evidence First

    // * If both is nothing, then show message to validate
    let pathList = [];

    if (
      Object.keys(imagesFiles ?? {}).length === 0 &&
      Object.keys(videoFiles ?? {}).length === 0
    ) {
      return Swal.fire({
        title: "Pemberitahuan",
        text: "Apakah kamu yakin akan mengirim aduan tanpa upload bukti gambar dan video ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          submitNewAduan(reqPayload);
        } else {
          setLoading(false);
        }
      });
    } else {
      // * If is there, then upload the evidence first to get the path
      if (Object.keys(imagesFiles ?? {}).length > 0) {
        const imgFilesArr = Array.from(imagesFiles);

        // * Loop array to upload evidence
        for (let i = 0; i < imgFilesArr.length; i++) {
          const payload = {
            file: imgFilesArr[i],
          };

          const response = await complainServices.uploadEvidence(payload);

          if (response.ok) {
            pathList.push({
              type: "image",
              url: response.data?.data?.url,
            });
          }
        }
      }

      if (Object.keys(videoFiles ?? {}).length > 0) {
        const vidFilesArr = Array.from(videoFiles);

        // * Loop array to upload evidence
        for (let i = 0; i < vidFilesArr.length; i++) {
          const payload = {
            file: vidFilesArr[i],
          };

          const response = await complainServices.uploadEvidence(payload);

          if (response.ok) {
            pathList.push({
              type: "video",
              url: response.data?.data?.url,
            });
          }
        }
      }

      if (checkArray(pathList)) {
        reqPayload.evidences = pathList;
      }

      await submitNewAduan(reqPayload);
    }
  };

  const submitNewAduan = async (payload) => {
    try {
      const response = await complainServices.addComplain(payload);

      if (response.ok) {
        setLoading(false);

        formik.resetForm();

        imageRef.current.value = "";

        setImagesFiles(null);

        videoRef.current.value = "";
        setVideoFiles(null);

        Swal.fire({
          title: "Berhasil Buat Aduan!",
          text: "Aduan mu telah berhasil dibuat, dan akan diproses setelah 7 hari. Jika lebih dari 7 hari, berarti tidak ditanggapi",
          icon: "success",
        });

        onSuccess();
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  // =====================================

  return (
    <>
      <div className={`${className} relative`}>
        <div className="flex flex-col items-center justify-start w-full">
          <Text
            className="font-bold text-2xl md:text-[22px] text-indigo-A200 sm:text-xl w-auto"
            size="txtPoppinsBold24"
          >
            Buat Aduan Anda
          </Text>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start w-full">
            <div className="flex flex-col items-start justify-center w-full">
              <Text
                className="text-normal text-lg w-auto mb-2"
                size="txtPoppinsBold24"
              >
                Tuliskan Judul Aduan
              </Text>
              <Input
                name="frameThree"
                placeholder="Tuliskan Judul Aduan"
                className="!text-gray-600 border border-gray-400 font-poppins p-0 text-left text-md w-full"
                wrapClassName="border border-gray-400 border-solid w-full"
                shape="round"
                color="#CBD5E0"
                size="md"
                variant="fill"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                errors={formik.errors?.title}
              ></Input>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <Text
              className="text-normal text-lg w-auto mb-2"
              size="txtPoppinsBold24"
            >
              Detail Aduan
            </Text>
            <textarea
              rows={4}
              name="detailAduan"
              placeholder="Jelaskan Detail Dari Aduan Anda"
              className="!text-gray-600 border-gray-400 font-poppins p-0 text-md text-left py-2 px-2 border rounded-md w-full focus:border-gray-400 whitespace-pre-line"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            ></textarea>

            {formik.errors?.description && (
              <ErrorMessage errors={formik.errors?.description} />
            )}
          </div>
          <div className="gap-4 md:gap-5 grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-center w-full">
                <Text
                  className="text-normal text-lg w-auto mb-2"
                  size="txtPoppinsBold24"
                >
                  Lokasi Kejadian
                </Text>
                <Input
                  name="lokasiKejadian"
                  placeholder="Lokasi Kejadian"
                  className="!text-gray-600 border border-gray-400 font-poppins p-0 text-left text-md w-full"
                  wrapClassName="border border-gray-400 border-solid w-full"
                  shape="round"
                  color="#CBD5E0"
                  size="xxs"
                  variant="fill"
                  value={formik.values.location}
                  onChange={formik.handleChange("location")}
                  errors={formik.errors?.location}
                ></Input>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-center w-full">
                <Text
                  className="text-normal text-lg w-auto mb-2"
                  size="txtPoppinsBold24"
                >
                  Tanggal Kejadian
                </Text>

                <DatePicker
                  selected={formik.values.date}
                  wrapperClassName="w-full"
                  dateFormat={"dd/MM/yyyy"}
                  placeholderText="DD/MM/YYYY"
                  onChange={(date) => formik.setFieldValue("date", date)}
                  maxDate={moment().toDate()}
                  customInput={
                    <Input
                      name="tanggalKejadian"
                      placeholder="DD/MM/YYYY"
                      className="!text-gray-600 border border-gray-400 font-poppins p-0 text-left text-md w-full"
                      wrapClassName="border border-gray-400 border-solid w-full"
                      shape="round"
                      color="#CBD5E0"
                      size="xxs"
                      variant="fill"
                    ></Input>
                  }
                />

                {formik.errors?.date && (
                  <ErrorMessage errors={formik.errors?.date} />
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start justify-start w-full">
              <div className="flex flex-col items-start justify-center w-full">
                <Text
                  className="text-normal text-lg w-auto mb-2"
                  size="txtPoppinsBold24"
                >
                  Kategori Aduan
                </Text>
                <SelectBox
                  className="!text-gray-600 border border-gray-400 border-solid font-poppins text-base text-left w-full"
                  placeholderClassName="!text-gray-600"
                  indicator={
                    <Img
                      className="h-6 w-6"
                      src="images/img_arrowdown.svg"
                      alt="arrow_down"
                    />
                  }
                  isMulti={false}
                  name="frameThree"
                  options={complaintCategories}
                  isSearchable={false}
                  placeholder="Kategori Aduan"
                  shape="round"
                  color="#CBD5E0"
                  size="xs"
                  variant="fill"
                  value={formik.values.category_id}
                  onChange={(value) =>
                    formik.setFieldValue("category_id", value, true)
                  }
                />

                {formik.errors?.category_id && (
                  <ErrorMessage errors={formik.errors?.category_id} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-col flex-row gap-4 items-center justify-center w-full">
          <div className="flex flex-1 sm:flex-col flex-row gap-2 items-center justify-between w-full">
            <List
              className="sm:flex-col flex-row gap-6 grid md:grid-cols-1 grid-cols-1 justify-start w-full"
              orientation="horizontal"
            >
              {/* Gambar */}
              <div className="col-span-1 flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                <div className="w-full flex flex-1 items-center space-x-4">
                  <Text
                    className="font-medium text-gray_800 text-left w-auto"
                    as="h5"
                    variant="h5"
                  >
                    Upload Bukti Gambar
                  </Text>

                  {imagesFiles && (
                    <>
                      <Text className="text-gray-400">|</Text>

                      <label
                        htmlFor="addImg"
                        className="flex items-center space-x-1 cursor-pointer"
                      >
                        <AddIcon className="fill-primary w-5 h-5" />

                        <Text>Tambah Gambar</Text>
                      </label>
                    </>
                  )}
                </div>

                <div className="w-full">
                  <input
                    multiple
                    ref={imageRef}
                    id="uploadImg"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImagesFiles(e.target.files);
                    }}
                  />

                  <input
                    multiple
                    ref={imageRef}
                    id="addImg"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleAddFile(
                        e.target.files,
                        imagesFiles,
                        setImagesFiles
                      );
                    }}
                  />

                  <input
                    ref={imageRef}
                    id="editImg"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleEditFile(
                        imagesFiles,
                        e.target.files[0],
                        setImagesFiles
                      );
                    }}
                  />

                  <div className="flex flex-col border border-dashed border-[#C5C5C5] rounded-[10px] h-[180px] group relative">
                    {/* Button For Upload */}
                    <label
                      htmlFor="uploadImg"
                      className={`absolute w-full ${
                        Object.keys(imagesFiles ?? {}).length > 0
                          ? "hidden"
                          : "flex"
                      } flex-col bg-[#F1F4F9] py-3.5 px-7 space-y-2.5 h-full rounded-[10px] justify-center items-center cursor-pointer`}
                    >
                      <Img
                        src="images/import_image.png"
                        className=" w-[60px] h-[60px]"
                        alt="phimagefill"
                      />

                      <Text
                        size=""
                        className="font-poppins text-[#8C8C8C] text-sm"
                      >
                        Unggah Gambar 380 x 300px maks 1MB
                      </Text>
                    </label>

                    <div className="w-full h-full overflow-auto no-scrollbar">
                      <div className="w-full flex flex-wrap gap-x-2 gap-y-1 py-3.5 px-3.5">
                        {/* Preview Image before upload */}
                        {Object.keys(imagesFiles ?? {}).length > 0 ? (
                          Object.entries(imagesFiles).map(
                            ([key, img], index) => {
                              const image = URL.createObjectURL(img);

                              return (
                                <div key={index}>
                                  <div className="relative uploaded-img">
                                    <img
                                      src={image}
                                      alt="preview"
                                      className="w-[70px] h-auto"
                                    />

                                    <div className="uploaded-img_child absolute top-0 left-0 right-0 bottom-0 hidden flex-col space-y-2 justify-center items-center bg-[rgba(255,255,255,0.5)]">
                                      <button
                                        onClick={() =>
                                          handleDeleteFile(
                                            index,
                                            imagesFiles,
                                            setImagesFiles
                                          )
                                        }
                                      >
                                        <div className="bg-[#E84C3D] rounded-full h-4 w-4 flex justify-center items-center px-0.5">
                                          <div className="h-0.5 w-full bg-white-A700_01" />
                                        </div>
                                      </button>

                                      <label
                                        htmlFor="editImg"
                                        onClick={() => setEditedId(index)}
                                        className="cursor-pointer"
                                      >
                                        <div className="bg-primary rounded-full h-4 w-4 flex justify-center items-center px-0.5">
                                          <ReplaceIcon className="fill-white-A700_01" />
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    {loadingDelete && (
                      <div className="absolute w-full flex justify-center items-center bg-[rgba(241,244,249,1)] rounded-[10px] h-full">
                        <LoadingAnimation />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </List>

            <List
              className="sm:flex-col flex-row gap-6 grid md:grid-cols-1 grid-cols-1 justify-start w-full"
              orientation="horizontal"
            >
              {/* Video */}
              <div className="col-span-1 flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                <div className="w-full flex flex-1 items-center space-x-4">
                  <Text
                    className="font-medium text-gray_800 text-left w-auto"
                    as="h5"
                    variant="h5"
                  >
                    Upload Bukti Video
                  </Text>

                  {videoFiles && (
                    <>
                      <Text className="text-gray-400">|</Text>

                      <label
                        htmlFor="addVideo"
                        className="flex items-center space-x-1 cursor-pointer"
                      >
                        <AddIcon className="fill-primary w-5 h-5" />

                        <Text>Tambah Video</Text>
                      </label>
                    </>
                  )}
                </div>

                <div className="w-full">
                  <input
                    multiple
                    ref={videoRef}
                    id="uploadVid"
                    className="hidden"
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => setVideoFiles(e.target.files)}
                  />

                  <input
                    multiple
                    ref={videoRef}
                    id="addVideo"
                    className="hidden"
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => {
                      handleAddFile(e.target.files, videoFiles, setVideoFiles);
                    }}
                  />

                  <input
                    ref={videoRef}
                    id="editVideo"
                    className="hidden"
                    type="file"
                    accept="video/mp4"
                    onChange={(e) => {
                      handleEditFile(
                        videoFiles,
                        e.target.files[0],
                        setVideoFiles
                      );
                    }}
                  />

                  <div className="flex flex-col border border-dashed border-[#C5C5C5] rounded-[10px] h-[180px] group relative">
                    {/* Button For Upload */}
                    <label
                      htmlFor="uploadVid"
                      className={`absolute w-full ${
                        Object.keys(videoFiles ?? {}).length > 0
                          ? "hidden"
                          : "flex"
                      } flex-col bg-[#F1F4F9] py-3.5 px-7 space-y-2.5 h-full rounded-[10px] justify-center items-center cursor-pointer`}
                    >
                      <Img
                        src="images/import_video.png"
                        className=" w-[60px] h-[60px]"
                        alt="phimagefill"
                      />

                      <Text
                        size=""
                        className="font-poppins text-[#8C8C8C] text-sm"
                      >
                        Unggah Video 720p maks 10MB
                      </Text>
                    </label>

                    <div className="w-full h-full overflow-auto no-scrollbar">
                      <div className="w-full flex flex-wrap gap-x-2 gap-y-1 py-3.5 px-3.5">
                        {/* Preview Image before upload */}
                        {Object.keys(videoFiles ?? {}).length > 0 ? (
                          Object.entries(videoFiles).map(
                            ([key, img], index) => {
                              const image = URL.createObjectURL(img);

                              return (
                                <div key={index}>
                                  <div className="relative uploaded-img">
                                    <video
                                      src={image}
                                      alt="preview"
                                      className="w-full h-[140px]"
                                    />

                                    <div className="uploaded-img_child absolute top-0 left-0 right-0 bottom-0 hidden flex-col space-y-2 justify-center items-center bg-[rgba(255,255,255,0.5)]">
                                      <button
                                        onClick={() =>
                                          handleDeleteFile(
                                            index,
                                            videoFiles,
                                            setVideoFiles
                                          )
                                        }
                                      >
                                        <div className="bg-[#E84C3D] rounded-full h-4 w-4 flex justify-center items-center px-0.5">
                                          <div className="h-0.5 w-full bg-white-A700_01" />
                                        </div>
                                      </button>

                                      <label
                                        htmlFor="editVideo"
                                        onClick={() => setEditedId(index)}
                                        className="cursor-pointer"
                                      >
                                        <div className="bg-primary rounded-full h-4 w-4 flex justify-center items-center px-0.5">
                                          <ReplaceIcon className="fill-white-A700_01" />
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    {loadingDelete &&
                      Object.keys(videoFiles ?? {}).length > 0 && (
                        <div className="absolute w-full flex justify-center items-center bg-[rgba(241,244,249,1)] rounded-[10px] h-full">
                          <LoadingAnimation />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </List>
          </div>
        </div>
        <div className="flex md:flex-col flex-row gap-4 items-center justify-center w-full">
          <div className="flex flex-1 flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-gray-600 text-sm w-auto"
              size="txtPoppinsRegular14"
            >
              Tampilkan Aduan Sebagai
            </Text>

            <RadioBtn
              id="is_anonymous"
              label="Anonim"
              selected={formik.values.is_anonymous}
              onSelect={() => {
                console.log("select", !formik.values.is_anonymous);
                formik.setFieldValue(
                  "is_anonymous",
                  !formik.values.is_anonymous
                );
              }}
            />
          </div>
          <Button
            className="!text-white-A700 cursor-pointer flex-1 font-bold font-poppins h-full text-base text-center w-full"
            shape="round"
            color="deep_orange_A200"
            size="md"
            variant="fill"
            onClick={formik.handleSubmit}
          >
            Kirim Aduan
          </Button>
        </div>

        {loading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(241,244,249,.7)] flex justify-center items-center rounded-[14px]">
            <LoadingAnimation />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeBuataduan;
