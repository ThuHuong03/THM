import React from 'react'

 function Bill() {
  return (
    <div className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5'>
        <div className='flex flex-row justify-between'>
            <label className='text-custom-red text-2xl font-bold uppercase'>Phiếu  xuất</label>
            <label className='text-lg text-dark-rust'>03/09/2024</label>
        </div>
        <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
            <div className='w-[20%] text-xl'> Loại: Cà nhân </div>
            <div className='w-[20%] text-xl'> Số lượng: 2.000 kg </div>
            <div className='w-[20%] text-xl'> Tình trạng: Đã thanh toán </div>
            <div className='w-[20%] text-xl'> Số tiền: 160.000.000 VND </div>
        </div>
        <div className='text-xl font-semibold '> Ghi chú: Không có</div>

    </div>
  )
}
function  PurchaseInvoice (){
    return(
    <div className='w-[100%] p-4 rounded-lg border-2 border-black flex flex-col bg-white mb-5 mt-5'>
    <div className='flex flex-row justify-between'>
        <label className='text-accept text-2xl font-bold uppercase'>Phiếu Nhập</label>
        <label className='text-lg text-dark-rust'>03/09/2024</label>
    </div>
    <div className='flex flex-row justify-between font-semibold mt-2 mb-2'>
        <div className='w-[20%] text-xl'> Loại: Cà nhân </div>
        <div className='w-[20%] text-xl'> Số lượng: 2.000 kg </div>
        <div className='w-[20%] text-xl'> Tình trạng: Đã thanh toán </div>
        <div className='w-[20%] text-xl'> Số tiền: 160.000.000 VND </div>
    </div>
    <div className='text-xl font-semibold '> Ghi chú: Không có</div>

</div>
) }
 export {Bill, PurchaseInvoice}
