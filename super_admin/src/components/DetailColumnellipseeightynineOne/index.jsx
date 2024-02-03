import React, { useState } from 'react';

import { Button, Img, Input, Line, List, Text } from "components";

const DetailColumnellipseeightynineOne = (props) => {
  const [activeTab, setActiveTab] = useState('tindakan'); // State untuk menandai tab yang aktif
  
    const changeTab = (tabName) => {
      setActiveTab(tabName);
    };
  return (
    <>
      <div className={props.className}>
        <div className="flex sm:flex-col flex-row gap-8 items-start justify-between w-full">
          <div className="flex flex-row gap-2 items-start justify-start w-auto">
            <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
              <Img
                className="h-12 md:h-auto rounded-[50%] w-12"
                src="images/img_ellipse89.png"
                alt="ellipseEightyNine_One"
              />
            </div>
            <div className="flex flex-col gap-[-5px] h-12 md:h-auto items-start justify-between">
              <Text
                className="text-base text-indigo-A200 w-auto"
                size="txtPoppinsMedium16"
              >
                Andi Nugraha
              </Text>
              <div className="flex flex-row gap-[21px] items-start justify-between w-auto">
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14"
                >
                  01 November 2023
                </Text>
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14"
                >
                  21:46
                </Text>
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14"
                >
                  #ID12345678
                </Text>
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14"
                >
                  Kategori Aduan
                </Text>
              </div>
            </div>
          </div>
          <Text
            className="bg-yellow-100 border border-solid border-yellow-600 justify-center pb-0.5 pt-[5px] px-1.5 rounded text-xs text-yellow-700 w-auto"
            size="txtPoppinsMedium12"
          >
            Aduan Diproses
          </Text>
        </div>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <Text
            className="capitalize text-base text-gray-900 w-auto"
            size="txtPoppinsSemiBold16Gray900"
          >
            Banyak Parkir Ojol Liar di Depan Sekolah sehingga bikin macet
          </Text>
          <Text
            className="max-w-[841px] md:max-w-full text-gray-600 text-sm"
            size="txtPoppinsRegular14"
          >
            Banyaknya parkir liar oleh ojek online di depan sekolah telah menjadi masalah serius. Kondisi ini mengakibatkan kemacetan lalu lintas yang mengganggu aktivitas di area sekolah, mengancam keselamatan siswa, dan membutuhkan penanganan yang segera.
          </Text>
        </div>
        <div className="flex flex-col gap-3 items-start justify-start w-full">
          <div className="flex sm:flex-col flex-row gap-2 items-start justify-start w-auto sm:w-full">
            <div className="flex flex-row gap-1 items-center justify-start w-auto">
              <Img
                className="h-4 w-4"
                src="images/img_materialsymbolsdaterange.svg"
                alt="materialsymbols"
              />
              <Text
                className="text-gray-600 text-xs w-auto"
                size="txtPoppinsLight12"
              >
                Senin, 30 Oktober 2023
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
                Jalan Telkom University Kecamatan Bojongsoang,
              </Text>
            </div>
          </div>
          <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
            <div className="bg-red-100 border border-red-500 border-solid flex flex-col h-24 items-center justify-start p-8 sm:px-5 rounded w-24">
              <Img
                className="h-8 w-8"
                src="images/img_mdifilepdfbox.svg"
                alt="mdifilepdfbox"
              />
            </div>
            <div className="bg-blue-100 border border-gray-300 border-solid h-24 relative rounded w-24">
              <Img
                className="h-24 m-auto object-cover rounded w-24"
                src="images/img_rectangle3286.png"
                alt="rectangle3286"
              />
              <Img
                className="absolute h-8 inset-[0] justify-center m-auto w-8"
                src="images/img_mdiplay.svg"
                alt="mdiplay"
              />
            </div>
            <div className="border border-gray-300 border-solid flex flex-col h-24 items-center justify-start rounded w-24">
              <Img
                className="h-24 md:h-auto object-cover rounded w-24"
                src="images/img_rectangle3286_96x96.png"
                alt="rectangle3286_One"
              />
            </div>
            <Img
              className="h-24 md:h-auto object-cover rounded w-24"
              src="images/img_rectangle3287.png"
              alt="rectangle3287"
            />
            <Img
              className="h-24 md:h-auto object-cover rounded w-24"
              src="images/img_rectangle3288.png"
              alt="rectangle3288"
            />
            <Img
              className="h-24 md:h-auto object-cover rounded w-24"
              src="images/img_rectangle3289.png"
              alt="rectangle3289"
            />
            <Img
              className="h-24 md:h-auto object-cover rounded w-24"
              src="images/img_rectangle3290.png"
              alt="rectangle3290"
            />
            <Img
              className="h-24 md:h-auto object-cover rounded w-24"
              src="images/img_rectangle3291.png"
              alt="rectangle3291"
            />
            <Img
              className="sm:flex-1 h-24 md:h-auto object-cover rounded w-[9px] sm:w-full"
              src="images/img_rectangle3291.png"
              alt="rectangle3294"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-auto sm:w-full">
            <div className="flex flex-col items-start justify-end w-auto">
              <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                <Text
                  className="text-gray-600 text-sm w-auto"
                  size="txtPoppinsRegular14"
                >
                  23
                </Text>
                <Img
                  className="h-6 w-6"
                  src="images/img_frame_indigo_a200.svg"
                  alt="frame"
                />
                <Text
                className={`text-gray-600 text-sm w-auto cursor-pointer ${
                  activeTab === 'tindakan' &&  <Line className="bg-indigo-A200 h-1 w-full" />
                }`}
                  size="txtPoppinsRegular14"
                  onClick={() => changeTab('tindakan')}
                >
                  Tindakan
                </Text>
              </div>
             
            </div>
            <List
              className="sm:flex-col flex-row gap-px grid sm:grid-cols-1 grid-cols-3 w-[73%] sm:w-full"
              orientation="horizontal"
            >
              <div className="flex flex-col items-start justify-end w-auto">
                <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                  <Text
                    className="text-gray-600 text-sm w-auto"
                    size="txtPoppinsRegular14"
                  >
                    121
                  </Text>
                  <Img
                    className="h-6 w-6"
                    src="images/img_frame_indigo_a200_24x24.svg"
                    alt="frame"
                  />
                  <Text
                    className={`text-gray-600 text-sm w-auto cursor-pointer ${
                      activeTab === 'like' &&  <Line className="bg-indigo-A200 h-1 w-full" />
                    }`}
                    size="txtPoppinsRegular14"
                    onClick={() => changeTab('like')}
                  >
                    Like
                  </Text>
                </div>
              </div>
              <div className="flex flex-col items-start justify-end w-auto">
                <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                  <Text
                    className="text-gray-600 text-sm w-auto"
                    size="txtPoppinsRegular14"
                  >
                    23
                  </Text>
                  <Img
                    className="h-6 w-6"
                    src="images/img_frame_24x24.svg"
                    alt="frame"
                  />
                  <Text
                    className={`text-gray-600 text-sm w-auto cursor-pointer ${
                      activeTab === 'komentar' &&  <Line className="bg-indigo-A200 h-1 w-full" />
                    }`}
                    size="txtPoppinsRegular14"
                    onClick={() => changeTab('komentar')}
                  >
                   Komentar
                  </Text>
                </div>
              </div>
              <div className="flex flex-col items-start justify-end w-auto">
                <div className="flex flex-row gap-2 items-center justify-start px-4 py-2.5 w-auto">
                  <Text
                    className="text-gray-600 text-sm w-auto"
                    size="txtPoppinsRegular14"
                  >
                    23
                  </Text>
                  <Img
                    className="h-6 w-6"
                    src="images/img_send.svg"
                    alt="send"
                  />
                  <Text
                    className={`text-gray-600 text-sm w-auto cursor-pointer ${
                      activeTab === 'bagikan' &&  <Line className="bg-indigo-A200 h-1 w-full" />
                    }`}
                    size="txtPoppinsRegular14"
                    onClick={() => changeTab('bagikan')}
                  >
                    Bagikan
                  </Text>
                </div>
              </div>
            </List>
          </div>

          {activeTab === 'tindakan' && <div className="flex flex-col items-start justify-start w-full">
            <div className="bg-white-A700 flex flex-col gap-[-22px] items-start justify-start w-full">
              <Line className="bg-gray-300 h-px w-full" />
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    <div className="bg-indigo-A200 border border-gray-200 border-solid flex flex-col h-12 items-center justify-start pt-2 px-2 rounded-[50%] w-12">
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
                    </div>
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                      <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                        <Text
                          className="text-base text-indigo-A200 w-auto"
                          size="txtPoppinsMedium16"
                        >
                          Admin Adu.in
                        </Text>
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            01 Nov 2023
                          </Text>
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            21:46
                          </Text>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                      <Text className="text-gray-600 text-sm w-auto" size="txtPoppinsRegular14">
                        <span className="text-gray-600 font-poppins text-left font-normal">
                          Aduan diteruskan ke{" "}
                        </span>
                        <span className="text-indigo-A200 font-poppins text-left font-semibold">
                          Pemerintah Desa Bojongsoang
                        </span>
                      </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <Line className="bg-gray-300 h-px w-full" />
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    <Img
                      className="h-12 md:h-auto rounded-[50%] w-12"
                      src="images/img_ellipse88.png"
                      alt="ellipseEightyEight"
                    />
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                      <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                        <Text
                          className="text-base text-indigo-A200 w-auto"
                          size="txtPoppinsMedium16"
                        >
                          Pemerintah Desa Bojongsoang
                        </Text>
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            01 Nov 2023
                          </Text>
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            21:46
                          </Text>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                      <Text className="text-gray-600 text-sm w-auto" size="txtPoppinsRegular14">
                        <span className="text-gray-600 font-poppins text-left font-normal">
                          Aduan diteruskan ke{" "}
                        </span>
                        <span className="text-indigo-A200 font-poppins text-left font-semibold">
                          Dinas Pekerjaan Umum Kab. Bandung
                        </span>
                      </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <Line className="bg-gray-300 h-px w-full" />
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    <Img
                      className="h-12 md:h-auto rounded-[50%] w-12"
                      src="images/img_ellipse88.png"
                      alt="ellipseEightyEight_One"
                    />
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-center w-full">
                      <div className="flex sm:flex-col flex-row gap-2.5 items-start justify-between w-full">
                        <Text
                          className="text-base text-indigo-A200 w-auto"
                          size="txtPoppinsMedium16"
                        >
                          Dinas Pekerjaan Umum Kab. Bandung
                        </Text>
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                           01 Nov 2023
                          </Text>
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            21:46
                          </Text>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                      <Text
                        className="max-w-[737px] md:max-w-full text-gray-600 text-sm"
                        size="txtPoppinsRegular14"
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
                      </div>
                    </div>
                  </div>
                </div>
                <Line className="bg-gray-300 h-px w-full" />
                <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                    <div className="flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
                      <Img
                        className="h-12 md:h-auto rounded-[50%] w-12"
                        src="images/img_ellipse89.png"
                        alt="ellipseEightyNine_Two"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                      <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                        <Text
                          className="text-base text-indigo-A200 w-auto"
                          size="txtPoppinsMedium16"
                        >
                          Andi Nugraha
                        </Text>
                        <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            01 Nov 2023
                          </Text>
                          <Text
                            className="text-gray-600 text-xs w-auto"
                            size="txtPoppinsRegular12"
                          >
                            21:46
                          </Text>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start w-full">
                        <Text
                          className="max-w-[737px] md:max-w-full text-gray-600 text-sm"
                          size="txtPoppinsRegular14"
                        >
                          Mohon segera ditertibkan karena menyebabkan kemacetan parah apabila jam berangkat dan jam pulang.
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <Line className="bg-gray-300 h-px w-full" />
                <div className="bg-gray-100 flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                  <div className="flex md:flex-col flex-row gap-2 items-center justify-center w-full">
                    <Img
                      className="h-12 md:h-auto rounded-[50%] w-12"
                      src="images/img_ellipse89.png"
                      alt="ellipseEightyNine_Three"
                    />
                    <div className="flex flex-1 flex-col items-start justify-start w-full">
                      <div className="flex flex-col items-start justify-center w-full">
                        <Input
                          name="frameThree"
                          placeholder="Balas Respon Tindakan disini..."
                          className="!placeholder:text-gray-600 !text-gray-600 font-poppins md:h-auto p-0 sm:h-auto text-base text-left w-full"
                          wrapClassName="border border-gray-400 border-solid w-full"
                          shape="round"
                          color="white_A700"
                          size="xs"
                          variant="fill"
                        ></Input>
                      </div>
                    </div>
                    <Button
                      className="!text-white-A700 cursor-pointer font-poppins font-semibold text-center text-sm w-[120px]"
                      shape="round"
                      color="deep_orange_A200"
                      size="xs"
                      variant="fill"
                    >
                      Kirim
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
          {activeTab === 'like' && ''}
          {activeTab === 'komentar' && 
           <div className="flex flex-col items-start justify-start w-full">
           <div className="bg-white-A700 flex flex-col gap-[-22px] items-start justify-start w-full">
             <Line className="bg-gray-300 h-px w-full" />
             <div className="flex flex-col items-start justify-start w-full">
               <div className="bg-yellow-100 border border-solid border-yellow-600 flex flex-col items-start justify-between sm:px-5 px-6 py-2 w-full">
                 <div className="flex flex-col items-start justify-start w-full">
                   <div className="flex flex-col items-start justify-start w-full">
                     <Text
                       className="leading-[150.00%] max-w-[793px] md:max-w-full text-sm text-yellow-700"
                       size="txtPoppinsRegular14Lime800"
                     >
                       Kolom Komentar bukanlah respon tindakan dari pihak Adu.in. Untuk melihar respon tindakan resmi dapat dilihat di kolom Tindakan
                     </Text>
                   </div>
                 </div>
               </div>
               <Line className="bg-gray-300 h-px w-full" />
               <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                 <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                   <Img
                     className="h-12 md:h-auto rounded-[50%] w-12"
                     src="images/img_ellipse89_48x48.png"
                     alt="ellipseEightyNine_Two"
                   />
                   <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                     <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                       <Text
                         className="text-base text-indigo-A200 w-auto"
                         size="txtPoppinsMedium16"
                       >
                         Dimas Anggara
                       </Text>
                       <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                         <Text
                           className="text-gray-600 text-xs w-auto"
                           size="txtPoppinsRegular12"
                         >
                           01 Nov 2023
                         </Text>
                         <Text
                           className="text-gray-600 text-xs w-auto"
                           size="txtPoppinsRegular12"
                         >
                           21:46
                         </Text>
                       </div>
                     </div>
                     <div className="flex flex-col items-start justify-start w-full">
                       <Text
                         className="text-gray-600 text-sm w-auto"
                         size="txtPoppinsRegular14"
                       >
                         Sebaiknya ini segera ditindak, tolong.
                       </Text>
                     </div>
                   </div>
                 </div>
               </div>
               <Line className="bg-gray-300 h-px w-full" />
               <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                 <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                   <Img
                     className="h-12 md:h-auto rounded-[50%] w-12"
                     src="images/img_ellipse89_1.png"
                     alt="ellipseEightyNine_Three"
                   />
                   <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                     <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                       <Text
                         className="text-base text-indigo-A200 w-auto"
                         size="txtPoppinsMedium16"
                       >
                         Sri Wahyuni
                       </Text>
                       <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                         <Text
                           className="text-gray-600 text-xs w-auto"
                           size="txtPoppinsRegular12"
                         >
                           01 Nov 2023
                         </Text>
                         <Text
                           className="text-gray-600 text-xs w-auto"
                           size="txtPoppinsRegular12"
                         >
                           21:46
                         </Text>
                       </div>
                     </div>
                     <div className="flex flex-col items-start justify-start w-full">
                       <Text
                         className="text-gray-600 text-sm w-auto"
                         size="txtPoppinsRegular14"
                       >
                         Ini sudah lama mengganggu dan meresahkan
                       </Text>
                     </div>
                   </div>
                 </div>
               </div>
               <Line className="bg-gray-300 h-px w-full" />
               <div className="flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                 <div className="flex md:flex-col flex-row gap-2 items-start justify-start w-full">
                   <Img
                     className="h-12 md:h-auto rounded-[50%] w-12"
                     src="images/img_ellipse89_2.png"
                     alt="ellipseEightyNine_Four"
                   />
                   <div className="flex flex-1 flex-col gap-2 h-full items-start justify-start w-full">
                     <div className="flex flex-row gap-2.5 items-start justify-between w-full">
                       <Text
                         className="text-base text-indigo-A200 w-auto"
                         size="txtPoppinsMedium16"
                       >
                         Handy Bramantyo
                       </Text>
                       <div className="flex flex-row gap-[19px] items-start justify-between w-auto">
                         <Text
                           className="text-gray-600 text-xs w-auto"
                           size="txtPoppinsRegular12"
                         >
                           01 Nov 2023
                         </Text>
                         <Text
                           className="text-gray-600 text-xs w-auto"
                           size="txtPoppinsRegular12"
                         >
                           21:46
                         </Text>
                       </div>
                     </div>
                     <div className="flex flex-col items-start justify-start w-full">
                       <Text
                         className="text-gray-600 text-sm w-auto"
                         size="txtPoppinsRegular14"
                       >
                         Sampai saat ini belum tindakan realnya, mana yaa??
                       </Text>
                     </div>
                   </div>
                 </div>
               </div>
               <Line className="bg-gray-300 h-px w-full" />
               <div className="bg-gray-100 flex flex-col items-start justify-between p-6 sm:px-5 w-full">
                 <div className="flex md:flex-col flex-row gap-2 items-center justify-center w-full">
                   <div className="bg-white-A700 flex flex-col h-12 items-center justify-start rounded-[50%] w-12">
                     <Img
                       className="h-12 md:h-auto rounded-[50%] w-12"
                       src="images/img_ellipse89.png"
                       alt="ellipseEightyNine_Five"
                     />
                   </div>
                   <div className="flex flex-1 flex-col items-start justify-start w-full">
                     <div className="flex flex-col items-start justify-center w-full">
                       <Input
                         name="frameThree"
                         placeholder="Tuliskan Komentar disini..."
                         className="!placeholder:text-gray-600 !text-gray-600 font-poppins md:h-auto p-0 sm:h-auto text-base text-left w-full"
                         wrapClassName="border border-gray-400 border-solid w-full"
                         shape="round"
                         color="white_A700"
                         size="xs"
                         variant="fill"
                       ></Input>
                     </div>
                   </div>
                   <Button
                     className="!text-white-A700 cursor-pointer font-poppins font-semibold text-center text-sm w-[120px]"
                     shape="round"
                     color="deep_orange_A200"
                     size="xs"
                     variant="fill"
                   >
                     Kirim
                   </Button>
                 </div>
               </div>
             </div>
           </div>
         </div>}
          {activeTab === 'bagikan' && 
           <div className="flex md:flex-col flex-row gap-4 items-start justify-start p-6 sm:px-5 w-full">
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-start justify-center w-full">
                  <Input
                    name="frameThree"
                    placeholder="httpss://www.adu.in/laporan/1234567890"
                    className="!placeholder:text-gray-900 !text-gray-900 font-poppins p-0 text-base text-left w-full"
                    wrapClassName="border border-gray-400 border-solid w-full"
                    shape="round"
                    color="gray_50"
                    size="xs"
                    variant="fill"
                  ></Input>
                </div>
              </div>
              <Button
                className="!text-deep_orange-A200 cursor-pointer font-poppins font-semibold h-[43px] text-center text-sm"
                shape="round"
                color="deep_orange_A200"
                size="xs"
                variant="outline"
              >
                Salin Tautan
              </Button>
            </div>}

          
        </div>
      </div>
    </>
  );
};


export default DetailColumnellipseeightynineOne;
