import { useNavigate } from 'react-router-dom';
import { Img, Text, Input } from "components";
import React, {useState} from "react";
import { CloseSVG } from "../../assets/images";

const Header1 = (props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [dataProductList, setDataProductList] = useState([]);
  const [datas, setData] = useState([]);

  // ***************** Search Function *****************

  const setInputvalue = (event) => {
    setSearchValue(event);
    const data = {
      nodes: dataProductList.filter(
        (item) =>
          (item.title.toLowerCase().includes(event.toLowerCase())) 
      ),
    };
    console.log(data.nodes)
    setData(data.nodes)
  };

  /// *********************************************
// ======= Navigation =======
const navigate = useNavigate();
const onClickSignIn = () => {
  navigate("/" + 'Masuk');
};
const onClickSignUp = () => {
  navigate("/" + 'Daftar');
};
// ==========================

  return (
    <>
    <div className="sticky top-0 z-50 bg-white w-full">
      <header className={props.className}>
        <div className="flex md:flex-col flex-row gap-6 items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start p-2.5 w-auto">
            <Text
              className="sm:text-2xl md:text-[26px] text-[28px] text-indigo-A200 w-auto"
              size="txtPlusJakartaSansBold28"
            >
              <span className="text-indigo-A200 font-poppins text-left font-bold">
                Adu
              </span>
              <span className="text-deep_orange-A200 font-poppins text-left font-bold">
                .
              </span>
              <span className="text-indigo-A200 font-poppins text-left font-bold">
                in
              </span>
            </Text>
          </div>
          <ul className="flex flex-row gap-8 sm:hidden items-center justify-start w-auto common-row-list">
            <li>
              <Text
                className="hover:font-semibold text-base text-indigo-A200"
                size="txtPoppinsSemiBold16"
              >
                Beranda
              </Text>
            </li>
            <li>
              <Text
                className="hover:font-semibold text-base text-gray-500 hover:text-indigo-A200"
                size="txtPoppinsRegular16Bluegray200"
              >
                Panduan
              </Text>
            </li>
            <li>
              <Text
                className="hover:font-semibold text-base text-gray-500 hover:text-indigo-A200"
                size="txtPoppinsRegular16Bluegray200"
              >
                Tentang Kami
              </Text>
            </li>
          </ul>
          {/* <div className="bg-white-A700 flex flex-1 flex-col items-start justify-start w-full">
            <div className="flex flex-col items-start justify-center w-full">
              <div className="bg-gray-100 border border-gray-400 border-solid flex flex-col items-start justify-center px-3.5 py-2.5 rounded-lg w-full">
                <div className="flex flex-row gap-1 items-center justify-start w-full">
                  <Img
                    className="h-6 w-6"
                    src="images/img_materialsymbolslightsearch.svg"
                    alt="materialsymbols"
                  />
                  <Text
                    className="flex-1 text-base text-gray-600 w-auto"
                    size="txtPoppinsRegular16Bluegray400"
                  >
                    Cari ID atau Judul disini..
                  </Text>
                </div>
              </div>
            </div>
          </div> */}
            {/* Input search */}
            <div className="bg-white-A700 flex flex-1 flex-col items-start justify-start w-full">
           <div className="flex flex-col items-start justify-center w-full">
                <Input
                  name="frame628479"
                  placeholder="Cari ID atau Judul Aduan Disini..."
                  value={searchValue}
                  onChange={(e) => setInputvalue(e)}
                  className="leading-[normal] p-0 placeholder:text-blue_gray-400 sm:pr-5 text-blue_gray-400 text-left text-xs tracking-[0.60px] w-full"
                  wrapClassName="bg-gray-200 flex md:flex-1 pl-4 pr-[35px] py-3 rounded-[22px] w-[60%] md:w-full"
                  prefix={
                    <Img
                      className="cursor-pointer h-5 mr-2 my-auto"
                      src="https://staging.digipac.id/public/images/iconsearch.png"
                      alt="search"
                    />
                  }
                  suffix={
                    <CloseSVG
                      onClick={() => setInputvalue("")}
                      style={{
                        visibility:
                          searchValue?.length <= 0 ? "hidden" : "visible",
                      }}
                      height={16}
                      width={16}
                      viewBox="0 0 20 20"
                    />
                  }
                />
              </div>
              </div>
            {/* ====================================== */}
          <div className="flex flex-row gap-8 items-center justify-start w-auto">
            <Text
              className="text-gray-500 text-lg w-auto cursor-pointer"
              size="txtPoppinsRegular18"
              onClick={onClickSignIn}
            >
              Masuk
            </Text>
            <Text
              className="text-gray-500 text-lg w-auto cursor-pointer"
              size="txtPoppinsRegular18"
              onClick={onClickSignUp}
            >
              Daftar
            </Text>
          </div>
        </div>
      </header>
      </div>
    </>
  );
};

Header1.defaultProps = {};

export default Header1;
