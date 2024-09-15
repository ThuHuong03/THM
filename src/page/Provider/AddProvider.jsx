import React, { useContext, useEffect, useState } from 'react';
import InputCmp from '../../components/InputCmp';
import { ActivedButton, GreenButton } from '../../components/Button';
import { AppContext } from '../../context/appContext';
import Provider from '../../class/provider';
export default function AddProvider({OnClickCancel}) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    bankAccount: '',
    phoneNumber: '',
    note: '',
    debit: '',
    credit: ''
  }); 
  

  const {host, getProviders} = useContext(AppContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
   

    const provider = new Provider({
        ...formData,
        debit: Number(formData.debit),
        credit: Number(formData.credit)
    });

  

    try {
        await provider.add(host, getProviders); 
     
        OnClickCancel(); 
    } catch (error) {
        console.error("Error in adding customer:", error);
        alert('Failed to add customer');
    }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">Thêm Nhà Cung Cấp</h2>
        
          <InputCmp title="Họ tên" name="name" value={formData.name} onChange={handleInputChange} placeholder="abc"/>
        <InputCmp title="Địa chỉ" name="address" value={formData.address} onChange={handleInputChange} placeholder="abc"/>
        <InputCmp title="Tài khoản ngân hàng" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} placeholder="BIDV 91282727"/>
        <InputCmp title="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="0981980948"/>
        <InputCmp title="Ghi chú" name="note" value={formData.note} onChange={handleInputChange} placeholder="ghi chú"/>
       
        <InputCmp title="Tổng tiền nợ" name="debit" value={formData.debit} onChange={handleInputChange} placeholder="VND"/>
        <InputCmp title="Tổng tiền gửi" name="credit" value={formData.credit} onChange={handleInputChange} placeholder="VND"/>
      <div className='flex justify-between m-2 mt-5'>
      <ActivedButton text="Hủy" onClick={OnClickCancel}/>
      <GreenButton text="Lưu" onClick={handleSubmit} />
      </div>
        
      </div>
    </div>
  );
}
