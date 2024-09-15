import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import {  useNavigate } from "react-router-dom";
export default function Table({
  title,
  onClickEdit,
  onClickDelete,
  detailPath, data, searchText,
 
}) {
  const navigate = useNavigate();
  const OnclickDetail = (id) => {
    
    navigate(`${detailPath}/${id}`);
  };
  const [currentPage, setCurrentPage] = useState( 1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Hàm tính toán dữ liệu cho trang hiện tại
  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = data.filter((ele) =>
    ele.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
    searchText === ''
  );

  const paginatedData = paginate(filteredData, currentPage, itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
 
    }
  };

  return (
    <section>
    <section className=" antialiased  text-black rounded-xl  ml-[100px] mr-[100px] mb-5">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-sem ibold text-4xl text-black"> {title}</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-lg">
                <thead className="text-xs font-bold uppercase text-black bg-custom-green">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">STT</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">Tên</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">Địa chỉ</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">
                        Số tài khoản
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">
                        Số điện thoại
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">Sửa</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">Xóa</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {console.log("data", data)};
                  {paginatedData.map((ele, index) => {
                                                                      
                                        return ( 
                  <React.Fragment key={index}>
                  

        

                    <tr
                      onClick={() =>OnclickDetail (ele._id)}
                      className="hover:bg-cream-200 cursor-pointer  active:bg-cream-400 "
                    >
                     
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{index+1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">
                          {ele.name}
                        </div>
                      </td>
                      <td cl assName="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{ele.address}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{ele.bankAccount}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{ele.phoneNumber}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaUserPen
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickEdit(ele);
                            }}
                          />
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickDelete(ele);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>)})}

                 
                </tbody>
              </table>
              <div className="flex space-x-3 ">
    
    </div>
            </div>
          </div>
          
        </div>
      </div>
      
    </section>
    <div className="flex justify-end w-full pr-[110px] space-x-4">
      <div className=" items-center justify-center flex h-12 px-4 py-2 bg-custom-green text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 active:bg-custom-green-600 text-black] mb-5">
      <FaArrowLeft className="text-black" onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === totalPages} />
    </div>
    <div  className=" items-center justify-center  flex h-12 px-4 py-2 bg-cream text-[#7C7C7C] rounded-lg text-lg font-medium  mb-5">
     <input className="h-[90%] bg-white rounded-lg w-8 pl-1 pr-1" value={currentPage} onChange={(e)=>handlePageChange(e.target.value)}/> 
      /{totalPages}
    </div>
    <div className=" items-center justify-center flex h-12 px-4 py-2 bg-custom-green text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 active:bg-custom-green-600 text-black] mb-5">
      <FaArrowRight className="text-black" onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages} />
    </div></div>
    </section>
  );
}
