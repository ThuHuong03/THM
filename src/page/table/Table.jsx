import React from 'react'
import { FaUserPen } from "react-icons/fa6";
import { FaTrash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
export default function Table({title, onClickEdit, onClickDelete, detailPath}) {

    const navigate = useNavigate();
    const OnclickDetail = ()=>{
        navigate(detailPath)
    }

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
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-bold text-left text-xl">Địa chỉ</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-bold text-left text-xl">Số tài khoản</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-bold text-left text-xl">Số điện thoại</div>
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
                                    {/* {users.map((ele, index)=> {
                                        if(ele.name.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            ele.email.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            ele.sexuality.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            ele.phone.toLowerCase().includes(searchUserText.toLowerCase().trim()) ||
                                            searchUserText=='')
                                        return ( */}
                                            {/* <React.Fragment key={index}>
                                             */}
                                               
                                             <React.Fragment >
                                              
                                                <tr onClick= {OnclickDetail} className='hover:bg-cream-200 cursor-pointer  active:bg-cream-400 '>
                                           
                                                <td className="p-2 whitespace-nowrap">
                                                        <div className="text-xl  text-left">1</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-xl  text-left">Nguyễn Thị Thu Hương</div>
                                                    </td>
                                                    <td cl assName="p-2 whitespace-nowrap">
                                                        <div className="text-xl  text-left">Thôn 9</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-xl  text-left">Bidv-982761538</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-xl  text-left">0991827263</div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-cream-200 active:bg-cream-600 cursor-pointer">
                                                            <FaUserPen onClick={onClickEdit}/>
                                                            
                                                            </div>
                                                    </td>
                                                    <td className="p-2 whitespace-nowrap">
                                                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-cream-200 active:bg-cream-600 cursor-pointer">
                                                            <FaTrash onClick= {onClickDelete}/>
                                                            
                                                            </div>
                                                    </td> 
                                                </tr>

                                                <tr onClick= {OnclickDetail} className='hover:bg-cream-200 cursor-pointer  active:bg-cream-400 '>
                                           
                                           <td className="p-2 whitespace-nowrap">
                                                   <div className="text-xl  text-left">1</div>
                                               </td>
                                               <td className="p-2 whitespace-nowrap">
                                                   <div className="text-xl  text-left">Nguyễn Thị Thu Hương</div>
                                               </td>
                                               <td cl assName="p-2 whitespace-nowrap">
                                                   <div className="text-xl  text-left">Thôn 9</div>
                                               </td>
                                               <td className="p-2 whitespace-nowrap">
                                                   <div className="text-xl  text-left">Bidv-982761538</div>
                                               </td>
                                               <td className="p-2 whitespace-nowrap">
                                                   <div className="text-xl  text-left">0991827263</div>
                                               </td>
                                               <td className="p-2 whitespace-nowrap">
                                                   <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-cream-200 active:bg-cream-600 cursor-pointer">
                                                       <FaUserPen onClick={onClickEdit}/>
                                                       
                                                       </div>
                                               </td>
                                               <td className="p-2 whitespace-nowrap">
                                                   <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-cream-200 active:bg-cream-600 cursor-pointer">
                                                       <FaTrash onClick= {onClickDelete}/>
                                                       
                                                       </div>
                                               </td> 
                                           </tr>
                                            </React.Fragment> 
                                           
                                        {/* ) */}
                                    {/* })} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
