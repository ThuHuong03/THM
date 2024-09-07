import React from 'react'
import InputCmp from '../../../components/InputCmp'
import { ActivedButton, GreenButton, ToggleButton } from '../../../components/Button'

export default function EditInvoice({OnClickCancel}) {
  return (

        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-dark-rust">
              CHỈNH SỬA PHIẾU
            </h2>
    
            <InputCmp title="Họ tên" placeholder="abc" />
            <InputCmp title="Ngày xuất" placeholder="abc" />
            <InputCmp title="Sản phẩm xuất" pla ceholder="BIDV 91282727" />
            <InputCmp title="Số lượng" placeholder="0981980948" />
            <InputCmp title="Đơn giá xuất" placeholder="ghi chú" />
            <InputCmp title="Tổng số tiền" placeholder="kg" />
            <InputCmp title="Tình trạng" placeholder="kg" />
            <InputCmp title="Độ" placeholder="kg" />
            <InputCmp title="Zem" placeholder="VND" />
            <InputCmp title="Bì" placeholder="VND" />
            
            <div className="flex justify-between m-2 mt-5">
              <ActivedButton text="Hủy" onClick={OnClickCancel} />
              <GreenButton text="Lưu" />
            </div>
          </div>
        </div>
  )
}
