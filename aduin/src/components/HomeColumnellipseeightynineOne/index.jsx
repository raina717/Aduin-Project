import React from "react";

import { Button, Img, Input, Line, List, Text } from "components";

const HomeColumnellipseeightynineOne = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex sm:flex-col flex-row gap-8 items-start justify-between w-full">
          <div className="flex flex-row gap-2 items-start justify-start w-auto">
            <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
              {!!props?.ellipseeightynineOne ? (
                <Img
                  className="h-12 md:h-auto rounded-[50%] w-12"
                  alt="ellipseEightyNine_One"
                  src={props?.ellipseeightynineOne}
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-[-5px] h-12 md:h-auto items-start justify-between">
              <Text
                className="text-base text-indigo-A200 w-auto"
                size="txtPoppinsMedium16IndigoA200"
              >
                {props?.andinugraha}
              </Text>
              <div className="flex flex-row gap-[21px] items-start justify-between w-auto">
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14Bluegray400"
                >
                  {props?.date}
                </Text>
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14Bluegray400"
                >
                  {props?.time}
                </Text>
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14Bluegray400"
                >
                  {props?.id12345678}
                </Text>
              </div>
            </div>
          </div>
          {!!props?.status ? (
            <Text
              className="bg-yellow-100 border border-solid border-yellow-600 justify-center pb-0.5 pt-[5px] px-1.5 rounded text-xs text-yellow-700 w-auto"
              size="txtPoppinsMedium12"
            >
              {props?.status}
            </Text>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <Text
            className="capitalize text-base text-gray-900 w-auto"
            size="txtPoppinsSemiBold16Gray900"
          >
            {props?.banyakparkirojoOne}
          </Text>
          <Text
            className="max-w-[841px] md:max-w-full text-gray-600 text-sm"
            size="txtPoppinsRegular14Bluegray400"
          >
            {props?.description}
          </Text>
        </div>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <div className="flex sm:flex-col flex-row gap-2 items-start justify-start w-auto sm:w-full">
            <div className="flex flex-row gap-1 items-center justify-start w-auto">
              <Img
                className="h-4 w-4"
                src="images/img_materialsymbolsdaterange.svg"
                alt="materialsymbols_One"
              />
              <Text
                className="text-gray-600 text-xs w-auto"
                size="txtPoppinsLight12"
              >
                {props?.senin30oktober}
              </Text>
            </div>
            <div className="flex flex-row gap-0.5 items-center justify-start w-auto">
              <Img
                className="h-4 w-4"
                src="images/img_mdilocation.svg"
                alt="mdilocation"
              />
              <Text
                className="text-gray-600 text-xs w-auto"
                size="txtPoppinsLight12"
              >
                {props?.jalantelkomunivOne}
              </Text>
            </div>
          </div>
          <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
            <div className="bg-red-100 border border-red-500 border-solid flex flex-col h-24 items-center justify-start p-8 sm:px-5 rounded w-24">
              {!!props?.mdifilepdfbox ? (
                <Img
                  className="h-8 w-8"
                  alt="mdifilepdfbox"
                  src={props?.mdifilepdfbox}
                />
              ) : null}
            </div>
            <div className="bg-blue-100 border border-gray-300 border-solid h-24 relative rounded w-24">
              {!!props?.rectangle3286 ? (
                <Img
                  className="absolute h-24 inset-[0] justify-center m-auto object-cover rounded w-24"
                  alt="rectangle3286"
                  src={props?.rectangle3286}
                />
              ) : null}
              {!!props?.mdiplay ? (
                <Img
                  className="absolute h-8 inset-[0] justify-center m-auto w-8"
                  alt="mdiplay"
                  src={props?.mdiplay}
                />
              ) : null}
            </div>
            <div className="border border-gray-300 border-solid flex flex-col h-24 items-center justify-start rounded w-24">
              {!!props?.rectangle3286one ? (
                <Img
                  className="h-24 md:h-auto object-cover rounded w-24"
                  alt="rectangle3286_One"
                  src={props?.rectangle3286one}
                />
              ) : null}
            </div>
            {!!props?.rectangle3287 ? (
              <Img
                className="h-24 md:h-auto object-cover rounded w-24"
                alt="rectangle3287"
                src={props?.rectangle3287}
              />
            ) : null}
            {!!props?.rectangle3288 ? (
              <Img
                className="h-24 md:h-auto object-cover rounded w-24"
                alt="rectangle3288"
                src={props?.rectangle3288}
              />
            ) : null}
            {!!props?.rectangle3289 ? (
              <Img
                className="h-24 md:h-auto object-cover rounded w-24"
                alt="rectangle3289"
                src={props?.rectangle3289}
              />
            ) : null}
            {!!props?.rectangle3290 ? (
              <Img
                className="h-24 md:h-auto object-cover rounded w-24"
                alt="rectangle3290"
                src={props?.rectangle3290}
              />
            ) : null}
            {!!props?.rectangle3291 ? (
              <Img
                className="h-24 md:h-auto object-cover rounded w-24"
                alt="rectangle3291"
                src={props?.rectangle3291}
              />
            ) : null}
            {!!props?.rectangle3294 ? (
              <Img
                className="sm:flex-1 h-24 md:h-auto object-cover rounded w-[9px] sm:w-full"
                alt="rectangle3294"
                src={props?.rectangle3294}
              />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-auto sm:w-full">
            <div className="flex flex-col items-start justify-end w-auto">
              <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                {!!props?.twentythree ? (
                  <Text
                    className="text-gray-600 text-sm w-auto"
                    size="txtPoppinsRegular14Bluegray400"
                  >
                    {props?.twentythree}
                  </Text>
                ) : null}
                {!!props?.frame ? (
                  <Img className="h-6 w-6" alt="frame" src={props?.frame} />
                ) : null}
                {!!props?.tindakan ? (
                  <Text
                    className="text-gray-600 text-sm w-auto"
                    size="txtPoppinsRegular14Bluegray400"
                  >
                    {props?.tindakan}
                  </Text>
                ) : null}
              </div>
              {!!props?.vectortwentyone ? (
                <Line className="bg-indigo-A200 h-1 w-full" />
              ) : null}
            </div>
            <List
              className="sm:flex-col flex-row gap-px grid sm:grid-cols-1 grid-cols-3 w-[73%] sm:w-full"
              orientation="horizontal"
            >
              <div className="flex flex-col items-start justify-end w-auto">
                <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                  {!!props?.twentythree1 ? (
                    <Text
                      className="text-gray-600 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray400"
                    >
                      {props?.twentythree1}
                    </Text>
                  ) : null}
                  {!!props?.frame1 ? (
                    <Img className="h-6 w-6" alt="frame" src={props?.frame1} />
                  ) : null}
                  {!!props?.tindakan1 ? (
                    <Text
                      className="text-gray-600 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray400"
                    >
                      {props?.tindakan1}
                    </Text>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-start justify-end w-auto">
                <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                  {!!props?.twentythree2 ? (
                    <Text
                      className="text-gray-600 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray400"
                    >
                      {props?.twentythree2}
                    </Text>
                  ) : null}
                  {!!props?.frame2 ? (
                    <Img className="h-6 w-6" alt="frame" src={props?.frame2} />
                  ) : null}
                  {!!props?.tindakan2 ? (
                    <Text
                      className="text-gray-600 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray400"
                    >
                      {props?.tindakan2}
                    </Text>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-start justify-end w-auto">
                <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                  {!!props?.twentythree3 ? (
                    <Text
                      className="text-gray-600 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray400"
                    >
                      {props?.twentythree3}
                    </Text>
                  ) : null}
                  {!!props?.frame3 ? (
                    <Img className="h-6 w-6" alt="frame" src={props?.frame3} />
                  ) : null}
                  {!!props?.bagikan ? (
                    <Text
                      className="text-gray-600 text-sm w-auto"
                      size="txtPoppinsRegular14Bluegray400"
                    >
                      {props?.bagikan}
                    </Text>
                  ) : null}
                </div>
              </div>
            </List>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div className="bg-white-A700 flex flex-col gap-[-22px] items-start justify-start w-full">
              {!!props?.vectorseventeen ? (
                <Line className="bg-gray-300 h-px w-full" />
              ) : null}
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    <div className="bg-indigo-A200 border border-gray-200 border-solid flex flex-col h-12 items-center justify-start pt-2 px-2 rounded-[50%] w-12">
                      {!!props?.aduin ? props?.aduin : null}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                      <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                        {!!props?.adminaduin ? (
                          <Text
                            className="text-base text-indigo-A200 w-auto"
                            size="txtPoppinsMedium16IndigoA200"
                          >
                            {props?.adminaduin}
                          </Text>
                        ) : null}
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          {!!props?.dateOne ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.dateOne}
                            </Text>
                          ) : null}
                          {!!props?.timeOne ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.timeOne}
                            </Text>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                        {!!props?.aduanditeruskanOne
                          ? props?.aduanditeruskanOne
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                {!!props?.vectortwenty ? (
                  <Line className="bg-gray-300 h-px w-full" />
                ) : null}
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    {!!props?.ellipseeightyeight ? (
                      <Img
                        className="h-12 md:h-auto rounded-[50%] w-12"
                        alt="ellipseEightyEight"
                        src={props?.ellipseeightyeight}
                      />
                    ) : null}
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                      <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                        {!!props?.pemerintahdesa ? (
                          <Text
                            className="text-base text-indigo-A200 w-auto"
                            size="txtPoppinsMedium16IndigoA200"
                          >
                            {props?.pemerintahdesa}
                          </Text>
                        ) : null}
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          {!!props?.dateTwo ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.dateTwo}
                            </Text>
                          ) : null}
                          {!!props?.timeTwo ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.timeTwo}
                            </Text>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                        {!!props?.aduanditeruskanThree
                          ? props?.aduanditeruskanThree
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                {!!props?.vectornineteen ? (
                  <Line className="bg-gray-300 h-px w-full" />
                ) : null}
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    {!!props?.ellipseeightyeightOne ? (
                      <Img
                        className="h-12 md:h-auto rounded-[50%] w-12"
                        alt="ellipseEightyEight_One"
                        src={props?.ellipseeightyeightOne}
                      />
                    ) : null}
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-center w-full">
                      <div className="flex sm:flex-col flex-row gap-2.5 items-start justify-between w-full">
                        {!!props?.dinaspekerjaan ? (
                          <Text
                            className="text-base text-indigo-A200 w-auto"
                            size="txtPoppinsMedium16IndigoA200"
                          >
                            {props?.dinaspekerjaan}
                          </Text>
                        ) : null}
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          {!!props?.dateThree ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.dateThree}
                            </Text>
                          ) : null}
                          {!!props?.timeThree ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.timeThree}
                            </Text>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                        {!!props?.descriptionOne ? props?.descriptionOne : null}
                      </div>
                    </div>
                  </div>
                </div>
                {!!props?.vectoreighteen ? (
                  <Line className="bg-gray-300 h-px w-full" />
                ) : null}
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
                      {!!props?.ellipseeightynineTwo ? (
                        <Img
                          className="h-12 md:h-auto rounded-[50%] w-12"
                          alt="ellipseEightyNine_Two"
                          src={props?.ellipseeightynineTwo}
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                      <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                        {!!props?.andinugrahaOne ? (
                          <Text
                            className="text-base text-indigo-A200 w-auto"
                            size="txtPoppinsMedium16IndigoA200"
                          >
                            {props?.andinugrahaOne}
                          </Text>
                        ) : null}
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          {!!props?.dateFour ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.dateFour}
                            </Text>
                          ) : null}
                          {!!props?.timeFour ? (
                            <Text
                              className="text-gray-600 text-xs w-auto"
                              size="txtPoppinsRegular12"
                            >
                              {props?.timeFour}
                            </Text>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                        {!!props?.mohonsegeraditeOne ? (
                          <Text
                            className="max-w-[737px] md:max-w-full text-gray-600 text-sm"
                            size="txtPoppinsRegular14Bluegray400"
                          >
                            {props?.mohonsegeraditeOne}
                          </Text>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {!!props?.vectortwentyoneOne ? (
                  <Line className="bg-gray-300 h-px w-full" />
                ) : null}
                <div className="bg-gray-100 flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-center justify-center w-full">
                    {!!props?.ellipseeightynineThree ? (
                      <Img
                        className="h-12 md:h-auto rounded-[50%] w-12"
                        alt="ellipseEightyNine_Three"
                        src={props?.ellipseeightynineThree}
                      />
                    ) : null}
                    <div className="flex flex-1 flex-col items-start justify-start w-full">
                      <div className="flex flex-col items-start justify-center w-full">
                        {!!props?.framethree ? (
                          <Input
                            name="frameThree"
                            placeholder="Balas Respon Tindakan disini..."
                            value={props?.framethree}
                            className="!placeholder:text-gray-600 !text-gray-600 font-poppins md:h-auto p-0 sm:h-auto text-base text-left w-full"
                            wrapClassName="border border-gray-400 border-solid w-full"
                            shape="round"
                            color="white_A700"
                            size="md"
                            variant="fill"
                          ></Input>
                        ) : null}
                      </div>
                    </div>
                    {!!props?.kirim ? (
                      <Button
                        className="cursor-pointer font-poppins font-semibold text-center text-sm w-[120px]"
                        shape="round"
                        color="deep_orange_A200"
                        size="xs"
                        variant="fill"
                      >
                        {props?.kirim}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

HomeColumnellipseeightynineOne.defaultProps = {
  andinugraha: "Andi Nugraha",
  date: "01 November 2023",
  time: "21:46",
  id12345678: "#ID12345678",
  banyakparkirojoOne:
    "Banyak Parkir Ojol Liar di Depan Sekolah sehingga bikin macet",
  description:
    "Banyaknya parkir liar oleh ojek online di depan sekolah telah menjadi masalah serius. Kondisi ini mengakibatkan kemacetan lalu lintas yang mengganggu aktivitas di area sekolah, mengancam keselamatan siswa, dan membutuhkan penanganan yang segera.",
  senin30oktober: "Senin, 30 Oktober 2023",
  jalantelkomunivOne: "Jalan Telkom University Kecamatan Bojongsoang,",
  aduin: (
    <Text
      className="leading-[13.00px] mt-0.5 text-[14.6px] text-center text-white-A700 w-[97%] sm:w-full"
      size="txtPlusJakartaSansBold146"
    >
      <span className="text-white-A700 font-poppins font-bold">
        <>
          Adu
          <br />
        </>
      </span>
      <span className="text-deep_orange-A200 font-poppins font-bold">.</span>
      <span className="text-white-A700 font-poppins font-bold">in</span>
    </Text>
  ),
  aduanditeruskanOne: (
    <Text
      className="text-gray-600 text-sm w-auto"
      size="txtPoppinsRegular14Bluegray400"
    >
      <span className="text-gray-600 font-poppins text-left font-normal">
        Aduan diteruskan ke{" "}
      </span>
      <span className="text-indigo-A200 font-poppins text-left font-semibold">
        Pemerintah Desa Bojongsoang
      </span>
    </Text>
  ),
  aduanditeruskanThree: (
    <Text
      className="text-gray-600 text-sm w-auto"
      size="txtPoppinsRegular14Bluegray400"
    >
      <span className="text-gray-600 font-poppins text-left font-normal">
        Aduan diteruskan ke{" "}
      </span>
      <span className="text-indigo-A200 font-poppins text-left font-semibold">
        Dinas Pekerjaan Umum Kab. Bandung
      </span>
    </Text>
  ),
  descriptionOne: (
    <Text
      className="max-w-[737px] md:max-w-full text-gray-600 text-sm"
      size="txtPoppinsRegular14Bluegray400"
    >
      <span className="text-gray-600 font-poppins text-left font-normal">
        Yth. Bapak/Ibu{" "}
      </span>
      <span className="text-gray-600 font-poppins text-left font-normal">
        <>
          Andi Nugraha
          <br />
        </>
      </span>
      <span className="text-gray-600 font-poppins text-left font-normal">
        <>
          <br />
          Terima kasih atas laporan Anda. Terkait hal tersebut akan kami
          sampaikan ke unit yang bersangkutan.
        </>
      </span>
    </Text>
  ),
};

export default HomeColumnellipseeightynineOne;
