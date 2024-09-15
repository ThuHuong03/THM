import React, { useContext, useEffect, useState } from 'react';
import InputCmp from '../../components/InputCmp';
import { ActivedButton, GreenButton } from '../../components/Button';
import { AppContext } from '../../context/appContext';
import Customer from '../../class/customer';
export default function EditCustomer({OnClickCancel, customer}) {

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    bankAccount: '',
    phoneNumber: '',
    note: '',
    totalRawCF: '',
    totalCF: '',
    totalPepper: '',
    debit: '',
    credit: ''
  }); 

  const {host, getCustomers} = useContext(AppContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
   

    const updateCustomer = new Customer({
        ...formData,
        totalRawCF: Number(formData.totalRawCF),
        totalCF: Number(formData.totalCF),
        totalPepper: Number(formData.totalPepper),
        debit: Number(formData.debit),
        credit: Number(formData.credit)
    });

  

    try {
        await updateCustomer.updateDetails(host, getCustomers); // Ensure host is passed here
     
        OnClickCancel(); // Optionally close the form after submission
    } catch (error) {
        console.error("Error in adding customer:", error);
        alert('Failed to add customer');
    }
};
useEffect(()=>{
      setFormData(customer);
    
},[])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">Chỉnh sửa Khách hàng</h2>
        
        <InputCmp title="Họ tên" name="name" value={formData.name} onChange={handleInputChange} placeholder="abc"/>
        <InputCmp title="Địa chỉ" name="address" value={formData.address} onChange={handleInputChange} placeholder="abc"/>
        <InputCmp title="Tài khoản ngân hàng" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} placeholder="BIDV 91282727"/>
        <InputCmp title="Số điện thoại" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="0981980948"/>
        <InputCmp title="Ghi chú" name="note" value={formData.note} onChange={handleInputChange} placeholder="ghi chú"/>
      <div className='flex justify-between m-2 mt-5'>
      <ActivedButton text="Hủy" onClick={OnClickCancel}/>
      <GreenButton onClick={handleSubmit} text="Lưu" />
      </div>
        
      </div>
    </div>
  );
}
