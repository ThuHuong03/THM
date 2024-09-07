import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { FaUserPen } from 'react-icons/fa6';

 function Bill({name, onClick, onClickEdit, onClickDelete}) {
  return (
    <div className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5 hover:scale-105 cursor-pointer duration-300 hover:bg-dark-rust-50 active:bg-dark-rust-100' onClick={onClick}>
        <div className='flex flex-row justify-between'>
            <label className='text-custom-red text-2xl font-bold uppercase'>Phiếu  xuất</label>
            <label className='text-lg text-dark-rust'>03/09/2024</label>
        </div>
        {name &&<div className='text-2xl font-bold '> Họ và tên: Nguyễn Thị Thu Hương</div>}
        <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
            <div className='w-[20%] text-xl'> Loại: Cà nhân </div>
            <div className='w-[20%] text-xl'> Số lượng: 2.000 kg </div>
            <div className='w-[20%] text-xl'> Tình trạng: Đã thanh toán </div>
            <div className='w-[20%] text-xl'> Số tiền: 160.000.000 VND </div>
        </div>

        <div className='text-xl font-semibold flex flex-row justify-between '> <label className='flex-1'> Ghi chú: Không có</label>  
                        <div className="text-2xl ml-5 mr-5 bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaUserPen
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickEdit();
                            }}
                          />
                        </div>
                    
              
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickDelete();
                            }}
                            
                          />
                        </div>
                      </div>

    </div>
  )
}
function  PurchaseInvoice ({name, onClick, onClickDelete, onClickEdit}){
    return(
    <div className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5 hover:scale-105 cursor-pointer duration-300 hover:bg-custom-green-50 active:bg-custom-green-100' onClick={onClick}>
    <div className='flex flex-row justify-between'>
        <label className='text-accept text-2xl font-bold uppercase'>Phiếu Nhập</label>
        <label className='text-lg text-dark-rust'>03/09/2024</label>
    </div>
    {name &&<div className='text-2xl font-bold '> Họ và tên: Nguyễn Thị Thu Hương</div>}
    <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
        <div className='w-[20%] text-xl'> Loại: Cà nhân </div>
        <div className='w-[20%] text-xl'> Số lượng: 2.000 kg </div>
        <div className='w-[20%] text-xl'> Tình trạng: Đã thanh toán </div>
        <div className='w-[20%] text-xl'> Số tiền: 160.000.000 VND </div>
    </div>
    <div className='text-xl font-semibold flex flex-row justify-between '> <label className='flex-1'> Ghi chú: Không có</label>  
                        <div className="text-2xl ml-5 mr-5 bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaUserPen
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickEdit();
                            }}
                          />
                        </div>
                    
              
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickDelete();
                            }}
                            
                          />
                        </div>
                      </div>

    </div>


) }
 export {Bill, PurchaseInvoice}
