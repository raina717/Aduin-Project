import { Text } from "components";
import React from "react";

// * Icon
import { ReactComponent as TindakanIcon } from "../../assets/icons/img_frame_indigo_a200.svg";
import { ReactComponent as SukaIcon } from "../../assets/icons/img_frame_indigo_a200_24x24.svg";
import { ReactComponent as KomentarIcon } from "../../assets/icons/img_frame_24x24.svg";
import { ReactComponent as BagikanIcon } from "../../assets/icons/img_send.svg";
import { ReactComponent as SukaFillIcon } from "../../assets/icons/suka_icon_fill.svg";

const TabsAduanConstant = [
  {
    id: "response_count",
    label: "Tindakan",
    icon: TindakanIcon,
  },
  {
    id: "like_count",
    label: "Suka",
    icon: SukaIcon,
    fillIcon: SukaFillIcon,
    noBorderLine: true,
  },
  {
    id: "comment_count",
    label: "Komentar",
    icon: KomentarIcon,
  },
  {
    id: "share_count",
    label: "Bagikan",
    icon: BagikanIcon,
  },
];

const TabsAduan = ({ activeTab, onChangeTab, data }) => {
  return (
    <div className="flex items-center relative">
      {TabsAduanConstant.map((d) => (
        <div
          className="px-4 py-2 cursor-pointer group relative"
          onClick={() => onChangeTab(d.label)}
        >
          <div className="flex flex-row items-center space-x-2">
            <Text className="text-gray-600 text-sm" size="txtPoppinsRegular14">
              {data[d.id]}
            </Text>

            {d.label === "Suka" && data.is_liked ? (
              <d.fillIcon className="fill-primary" />
            ) : (
              <d.icon
                className={`${
                  d.noBorderLine
                    ? "fill-gray-600 group-hover:fill-primary"
                    : "fill-primary"
                }`}
              />
            )}

            <Text
              className={`text-gray-600 text-sm`}
              size="txtPoppinsRegular14"
            >
              {d.label}
            </Text>
          </div>

          {!d.noBorderLine && (
            <div
              className={`h-0.5 z-10 w-full absolute bottom-0 left-0 group-hover:bg-[#4475F2] ${
                activeTab === d.label ? "bg-[#4475F2]" : ""
              } transition-all ease-in-out duration-300`}
            />
          )}
        </div>
      ))}

      <div className="absolute h-px w-full bottom-0 bg-gray-300 left-0" />
    </div>
  );
};

export default TabsAduan;
