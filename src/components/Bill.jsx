import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { FaUserPen } from 'react-icons/fa6';

 function BillDiv({name, onClick, onClickEdit, onClickDelete, invoice}) {
  return (
    <div onClick= {()=> onClickEdit(invoice)} className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5 hover:scale-105 cursor-pointer duration-300 hover:bg-dark-rust-50 active:bg-dark-rust-100' >
        <div className='flex flex-row justify-between'>
            <label className='text-custom-red text-2xl font-bold uppercase'>{invoice.title}</label>
            <label className='text-lg text-dark-rust'>{invoice.date}</label>
        </div>
        {name &&<div className='text-2xl font-bold '> Họ và tên: {invoice.customer.name|| invoice.customer._id}</div>}
        <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
            <div className='w-[20%] text-xl'> Loại: {invoice.type} </div>
            <div className='w-[20%] text-xl'> Số lượng: {invoice.totalAmount.toLocaleString('vi-VN')} {invoice.type == "tiền" ? "VND": "kg"} </div>
            <div className='w-[20%] text-xl'> Tình trạng: {invoice.status=="hoàn thành"? <label className='text-accept uppercase'>đã hoàn thành</label>: invoice.status =="chưa hoàn thành" ? <label className=' uppercase text-custom-red'>chưa hoàn thành</label> :"GỬI TẠI KHO" } </div>
            <div className='w-[20%] text-xl'> Số tiền: {invoice.price?.toLocaleString('vi-VN')} VND </div>
        </div>

        <div className='text-xl font-semibold flex flex-row justify-between '> <label className='flex-1'> Ghi chú: {invoice.note}</label>  
                        <div className="text-2xl ml-5 mr-5 bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaUserPen
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickEdit(invoice);
                            }}
                          />
                        </div>
                    
              
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickDelete(invoice);
                            }}
                            
                          />
                        </div>
                      </div>

    </div>
  )
}
function  PurchaseInvoiceDiv ({name, onClick, onClickEdit, onClickDelete, clickEdit , invoice}){
    return(
    <div onClick= {()=> onClickEdit(invoice)} className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5 hover:scale-105 cursor-pointer duration-300 hover:bg-custom-green-50 active:bg-custom-green-100' >
    <div className='flex flex-row justify-between'>
    <label className='text-accept text-2xl font-bold uppercase'>{invoice.title}</label>
    <label className='text-lg text-dark-rust'>{invoice.date}</label>
    </div>
    {name &&<div className='text-2xl font-bold '> Họ và tên: {invoice.customer.name|| invoice.customer._id}</div>}
        <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
            <div className='w-[20%] text-xl'> Loại: {invoice.type} </div>
            <div className='w-[20%] text-xl'> Số lượng: {invoice.totalAmount.toLocaleString('vi-VN')} {invoice.type == "tiền" ? "VND": "kg"} </div>
            <div className='w-[20%] text-xl'> Tình trạng: {invoice.status =="hoàn thành"? <label className='text-accept uppercase'>đã hoàn thành</label>: invoice.status =="chưa hoàn thành" ? <label className=' uppercase text-custom-red'>chưa hoàn thành</label> :"GỬI TẠI KHO" } </div>
            <div className='w-[20%] text-xl'> Số tiền: {invoice.price?.toLocaleString('vi-VN')} VND </div>
        </div>

        <div className='text-xl font-semibold flex flex-row justify-between '> <label className='flex-1'> Ghi chú: {invoice.note}</label>  
                        <div className="text-2xl ml-5 mr-5 bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                        <FaUserPen
                           onClick={(e) => {
                            e.stopPropagation();
                            onClickEdit(invoice);
                          }}
                          />
                        </div>
                    
              
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickDelete(invoice);
                            }}
                            
                          />
                        </div>
                      </div>

    </div>


) }
function  SaleInvoiceDiv ({name, onClick, onClickDelete, onClickEdit, invoice}){
    return(
    <div onClick= {()=> onClickEdit(invoice)} className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5 hover:scale-105 cursor-pointer duration-300 hover:bg-custom-green-50 active:bg-custom-green-100' >
    <div className='flex flex-row justify-between'>
    <label className='text-custom-green-700 text-2xl font-bold uppercase'>{invoice.title}</label>
    <label className='text-lg text-dark-rust'>{invoice.date}</label>
    </div>
    {name &&<div className='text-2xl font-bold '> Họ và tên: {invoice.customer.name|| invoice.customer._id}</div>}
        <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
            <div className='w-[20%] text-xl'> Loại: {invoice.type} </div>
            <div className='w-[20%] text-xl'> Số lượng: {invoice.totalAmount.toLocaleString('vi-VN')} {invoice.type == "tiền" ? "VND": "kg"} </div>
            <div className='w-[20%] text-xl'> Tình trạng: {invoice.status=="đã chốt"? <label className='text-custom-red uppercase'>đã chốt</label>:  <label className='text-accept uppercase'>hoàn thành</label> } </div>
            <div className='w-[20%] text-xl'> Số tiền: {invoice.price?.toLocaleString('vi-VN')} VND </div>
        </div>

        <div className='text-xl font-semibold flex flex-row justify-between '> <label className='flex-1'> Ghi chú: {invoice.note}</label>  
                        <div className="text-2xl ml-5 mr-5 bg-cream h-10 items-center justify-center flex w-10 rounded-lg hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaUserPen
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickEdit(invoice);
                            }}
                          />
                        </div>
                    
              
                        <div className="text-2xl  bg-cream h-10 items-center justify-center flex w-10 rounded-lg  hover:bg-dark-rust-200 active:bg-cream-600 cursor-pointer">
                          <FaTrash
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickDelete(invoice);
                            }}
                            
                          />
                        </div>
                      </div>

    </div>


) }
 export {BillDiv, PurchaseInvoiceDiv, SaleInvoiceDiv}
