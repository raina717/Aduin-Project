import React from "react";
import { Button, Text, Input, Img } from "components";
import DetailColumnellipseeightynineOne from "components/CardAduan/DetailAduan";                 
             
export const ListAduanComponents = () => {
    
    return (
        <>
        <div className="flex flex-col font-plusjakartasans items-center justify-start mx-auto w-full">
            {/* <div className="bg-gray-100 flex flex-col items-center justify-start w-full"> */}
            
            <div className="flex flex-col font-poppins items-start justify-start max-w-[873px] mt-9 mx-auto md:px-5 w-full">
                <DetailColumnellipseeightynineOne
                className="bg-white-A700 border border-gray-300 border-solid flex flex-col gap-8 items-start justify-start px-4 py-6 rounded-[14px] w-full"
                aduin={
                    <Text className="font-bold leading-[13.00px] mt-0.5 text-[14.6px] text-center text-white-A700">
                    <span className="text-white-A700 font-poppins">
                        <>
                        Adu
                        <br />
                        </>
                    </span>
                    <span className="text-deep_orange-A200 font-poppins">.</span>
                    <span className="text-white-A700 font-poppins">in</span>
                    </Text>
                }
                aduanditeruskanOne={
                    <Text className="text-gray-600 text-sm w-auto">
                    <span className="text-gray-600 font-poppins text-left font-normal">
                        Aduan diteruskan ke{" "}
                    </span>
                    <span className="text-indigo-A200 font-poppins text-left font-semibold">
                        Pemerintah Desa Bojongsoang
                    </span>
                    </Text>
                }
                aduanditeruskanThree={
                    <Text className="text-gray-600 text-sm w-auto">
                    <span className="text-gray-600 font-poppins text-left font-normal">
                        Aduan diteruskan ke{" "}
                    </span>
                    <span className="text-indigo-A200 font-poppins text-left font-semibold">
                        Dinas Pekerjaan Umum Kab. Bandung
                    </span>
                    </Text>
                }
                descriptionOne={
                    <Text className="text-gray-600 text-sm">
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
                        Terima kasih atas laporan Anda. Terkait hal tersebut akan
                        kami sampaikan ke unit yang bersangkutan.
                        </>
                    </span>
                    </Text>
                }
                />
            </div>
            
            </div>
        {/* </div> */}
        
        </>
    )
    } 
export default ListAduanComponents;      
                    
                    