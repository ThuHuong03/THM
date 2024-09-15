import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({placeholder, setSearchText, value}) {
  return (
    <div className="flex justify-between m-10 ml-[100px] mr-[100px]">
      <div className="bg-cream rounded-lg  p-1  w-full placeholder-custom text-black text-lg flex items-center space-x-1 h-10 m-1">
        <FaSearch className="text-black" />
        <input
          className="bg-cream w-full"
          placeholder={placeholder}
          onChange={(e) =>{setSearchText(e.target.value)}}
          type="text"
        />
      </div>
      <div className="bg-cream rounded-lg  h-10 w-10 flex items-center justify-center m-1 hover:bg-dark-rust-400 cursor-pointer active:bg-dark-rust-600 ">
        <FaSearch className="text-black" />
      </div>
    </div>
  );
}
