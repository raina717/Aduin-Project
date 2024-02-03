import React, { useRef, useState } from "react";

import { Text } from "components";

import AvatarImg from "../../assets/images/avatar.png";

// * Icon
import { ReactComponent as CalendarIcon } from "../../assets/icons/img_materialsymbolsdaterange.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/img_mdilocation.svg";
import { ReactComponent as ZoomIcon } from "../../assets/icons/zoom_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close_icon.svg";
import { checkArray } from "utils";
import moment from "moment";
import BadgeStatus from "components/BadgeStatus";

const DetailAduan = ({ data }) => {
  const zoomImgRef = useRef();

  const [zoomEvidence, setZoomEvidence] = useState(false);
  const [zoomType, setZoomType] = useState("image");
  const [selectedEvidence, setSelectedEvidence] = useState("");

  const [zoomSize, setZoomSize] = useState({
    width: 0,
    height: 0,
  });

  const {
    complaint_num,
    submited_by,
    title,
    category,
    location,
    status,
    description,
    is_anonymous,
    date,
    created_at,
    evidences,
  } = data;

  const onImgLoad = () => {
    setZoomSize({
      width: zoomImgRef.current?.offsetWidth,
      height: zoomImgRef.current?.offsetHeight,
    });
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center space-x-2">
        <img
          src={
            submited_by?.profile_photo === "" || is_anonymous
              ? AvatarImg
              : submited_by?.profile_photo
          }
          alt="Profile Pic"
          className="w-12 h-12 object-cover rounded-full"
        />

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <Text className="text-primary">
              {is_anonymous ? "Anonymous" : submited_by?.name ?? "-"}
            </Text>

            <BadgeStatus label={status} isDanger={status === "Ditolak"} />
          </div>

          <div className="flex items-center space-x-2">
            <Text className="text-gray-600 text-sm">
              {moment(created_at).subtract(7, "hour").format("DD MMMM YYYY")}
            </Text>
            <Text className="text-gray-600">•</Text>
            <Text className="text-gray-600 text-sm">
              {moment(created_at).subtract(7, "hour").format("HH:mm")}
            </Text>
            <Text className="text-gray-600">•</Text>
            <Text className="text-gray-600 text-sm">{complaint_num}</Text>
            <Text className="text-gray-600">•</Text>
            <Text className="text-gray-600 text-sm">
              {category?.category_name}
            </Text>
          </div>
        </div>
      </div>

      {/* Content Title & Description */}
      <div>
        <Text className="mb-3 font-poppins font-semibold">{title}</Text>

        <Text className="text-gray-600 text-sm whitespace-pre-line">
          {description}
        </Text>
      </div>

      {/* Content Kejadian */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-0.5">
            <CalendarIcon className="fill-gray-500" />
            <Text className="text-gray-600 text-xs">
              {moment(date).locale("id").format("dddd, DD MMMM YYYY")}
            </Text>
          </div>

          <div className="flex items-center space-x-0.5">
            <LocationIcon className="fill-gray-500" />
            <Text className="text-gray-600 text-xs">{location}</Text>
          </div>
        </div>

        <div className="flex overflow-x-auto overflow-y-hidden space-x-2">
          {checkArray(evidences) ? (
            evidences.map((d) => {
              return (
                <div className="relative group flex-shrink-0">
                  {d?.type === "image" ? (
                    <img
                      alt="evidence"
                      src={d?.url}
                      className="h-24 w-24 rounded object-cover cursor-pointer"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      alt="evidence"
                      src={d?.url}
                      className="h-24 w-auto cursor-pointer"
                    />
                  )}

                  <div
                    className="bg-[rgba(255,255,255,0.8)] justify-center items-center group-hover:flex hidden absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
                    onClick={() => {
                      setZoomEvidence(true);
                      setZoomType(d?.type);
                      setSelectedEvidence(d?.url);
                    }}
                  >
                    <ZoomIcon className="fill-primary" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-24 w-24 border border-dashed border-gray-500 items-center justify-center flex px-2 rounded">
              <Text
                size=""
                className="font-normal text-sm text-center select-none"
              >
                No Evidence
              </Text>
            </div>
          )}

          {zoomEvidence && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[10000] p-20">
              <div className="w-auto h-full relative">
                {zoomType === "image" ? (
                  <img
                    ref={zoomImgRef}
                    src={selectedEvidence}
                    alt="evidence"
                    className="w-auto h-full object-contain mx-auto"
                    onLoad={onImgLoad}
                  />
                ) : (
                  <video
                    autoPlay
                    controls
                    ref={zoomImgRef}
                    src={selectedEvidence}
                    alt="evidence"
                    className="w-auto h-full object-contain mx-auto"
                    onLoad={onImgLoad}
                  />
                )}

                <div
                  className={`absolute top-0 left-0 right-0 mx-auto`}
                  style={{
                    width: zoomSize?.width + "px",
                    height: zoomSize?.height + "px",
                  }}
                >
                  <div className="flex justify-end items-center -mt-4 -mr-4">
                    <button
                      onClick={() => setZoomEvidence(false)}
                      className="bg-white-A700_01 p-1.5 rounded-full"
                    >
                      <CloseIcon fill="red" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAduan;
