import React from "react";

import {  useNavigate } from "react-router-dom";
export default function ReportTable({
  title,
fertilizer,
  detailPath, data
}) {
  const navigate = useNavigate();
  const OnclickDetail = (id) => {
    
    navigate(`${detailPath}/${id}`);
  };

  return (
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
                   {fertilizer==true ? "": <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">Địa chỉ</div>
                    </th>}
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">
                        Số tiền xuất
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-bold text-left text-xl">
                        Số tiền nhập
                      </div>
                    </th>
                   </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {console.log("data", data)};
                  {data.map((ele, index) => {
                                
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
                      {fertilizer==true ? "": <td cl assName="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{ele.address}</div>
                      </td>}
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{ele.totalExportMoney.toLocaleString('vi-VN')}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-xl  text-left">{ele.totalImportMoney.toLocaleString('vi-VN')}</div>
                      </td>
                   
                    </tr>
                  </React.Fragment>)})}

                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
