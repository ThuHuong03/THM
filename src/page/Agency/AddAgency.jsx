import React from 'react';
import InputCmp from '../../components/InputCmp';
import { ActivedButton, GreenButton } from '../../components/Button';

export default function AddAgency({OnClickCancel}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">Thêm Đại Lý</h2>
        
        <InputCmp title="Họ tên" placeholder="abc"/>
        <InputCmp title="Địa chỉ" placeholder="abc"/>
        <InputCmp title="Tài khoản ngân hàng" placeholder="BIDV 91282727"/>
        <InputCmp title="Số điện thoại" placeholder="0981980948"/>
        <InputCmp title="Ghi chú" placeholder="ghi chú"/>
        <InputCmp title="Tổng tiền nợ" placeholder="VND"/>
        <InputCmp title="Tổng tiền gửi" placeholder="VND"/>
      <div className='flex justify-between m-2 mt-5'>
      <ActivedButton text="Hủy" onClick={OnClickCancel}/>
      <GreenButton text="Lưu" />
      </div>
        
      </div>
    </div>
  );
}
