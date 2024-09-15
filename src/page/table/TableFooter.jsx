import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function TableFooter({page, handlePageChange, totalPages}) {
  return (
    <div className="flex space-x-3 ">
      <div className=" items-center justify-center flex h-12 px-4 py-2 bg-custom-green text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 active:bg-custom-green-600 text-black] mb-5">
        <FaArrowLeft className="text-black"  onClick={()=>handlePageChange(page-1)}/>
      </div>
      <div  className=" items-center justify-center flex h-12 px-4 py-2 bg-cream text-[#7C7C7C] rounded-lg text-lg font-medium  mb-5">
       <div className="h-[90%] bg-white rounded-lg pl-1 pr-1"> {page}</div>
        /{totalPages}
      </div>
      <div className=" items-center justify-center flex h-12 px-4 py-2 bg-custom-green text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 active:bg-custom-green-600 text-black] mb-5">
        <FaArrowRight className="text-black"  onClick={()=>handlePageChange(page+1)}/>
      </div>
    </div>
  );
}
