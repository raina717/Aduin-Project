import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Text } from "./Text";
import { Img } from "./Img";

import AvatarImg from "../assets/images/avatar.png";
import { checkArray } from "utils";

import { useNavigate } from "react-router-dom";

// * Icon
import { ReactComponent as ArrowIcon } from "../assets/icon/img_arrowdown.svg";
import { ReactComponent as ArrowLeftIcon } from "../assets/icon/img_arrowleft.svg";
import history from "utils/history";
import { ContainerContext } from "context/ContainerContext";
import { authServices } from "services";

export let HeaderHeight = 0;

const Header = () => {
  const { headerSubMenu, headerTitle, additionalHeader } =
    useContext(ContainerContext);

  const ref = useRef();

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchInitialize();
  }, []);

  const fetchInitialize = async () => {
    const response = await authServices.userProfile();

    if (response?.ok) {
      if (response?.data?.data) {
        setProfile(response?.data?.data);
      }
    }
  };

  const withSubMenu = checkArray(headerSubMenu);

  useLayoutEffect(() => {
    HeaderHeight = ref.current?.offsetHeight;
  }, []);

  return (
    <div ref={ref} className="sticky top-0 z-50">
      <div className="p-6 flex flex-row items-center justify-between bg-white-A700">
        <div className="flex space-x-4">
          <Text
            className={`${
              withSubMenu ? "text-primary font-semibold" : "text-gray-500 "
            }`}
          >
            {headerTitle}
          </Text>

          {checkArray(headerSubMenu) &&
            headerSubMenu.map((text, index) => (
              <div key={index} className="flex items-center space-x-4">
                <ArrowIcon className="fill-gray-500 rotate-[-95deg]" />

                <Text className="text-gray-500">
                  {decodeURIComponent(text)}
                </Text>
              </div>
            ))}
        </div>

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate(`/profile`)}
        >
          <Img
            src={
              profile?.profile_photo
                ? profile?.profile_photo === ""
                  ? AvatarImg
                  : profile?.profile_photo
                : AvatarImg
            }
            alt="avatar"
            className="h-12 w-12 object-cover rounded-full"
          />

          <div>
            <Text className="underline mb-0.5">{profile?.fullname ?? "-"}</Text>

            <Text className="text-gray-600 text-sm">
              {profile?.role?.role_name ?? "-"}
            </Text>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-300 sticky top-0 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {withSubMenu && (
            <button onClick={() => history.back()}>
              <ArrowLeftIcon className="stroke-[#1E1E1E]" />
            </button>
          )}

          <Text
            size="txtPoppinsSemiBold16"
            className="font-semibold text-[#1E1E1E] text-xl"
          >
            {withSubMenu
              ? decodeURIComponent(headerSubMenu[headerSubMenu.length - 1])
              : headerTitle}
          </Text>
        </div>

        {additionalHeader}
      </div>
    </div>
  );
};

export default Header;
