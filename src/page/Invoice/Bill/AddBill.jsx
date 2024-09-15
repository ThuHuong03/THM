import React, { useContext, useEffect, useRef, useState } from "react";
import InputCmp from "../../../components/InputCmp";
import {
  ActivedButton,
  GreenButton,
  ToggleButton,
} from "../../../components/Button";
import { AppContext } from "../../../context/appContext";
import { Bill } from "../../../class/bill";

import { calculateTotalAmount } from "../../../mathFormula/calculateTotalAmount";
import getCurrentDate from "../../../mathFormula/getCurrentDay";
import { PurchaseInvoice } from "../../../class/purchaseInvoice";
import ReactToPrint from 'react-to-print';
import MyComponent from "../PDF/print";
import PrintPDF from "../PDF/PrintPdf";
export default function AddBill({ OnClickCancel, type, detailAmount, totalAmount }) {

   const [formData, setFormData] = useState({
    customer :{name: '', _id: ''},
    _id: '',
   price: 0,
    date: getCurrentDate(),
    type: typeof(type) == 'object'  ? type._id:type,
    totalAmount: totalAmount,
    status : '',
    note : '',  
    detailAmount : detailAmount,  
    humidity : 0,      
    zem : 0,            
    packaging :0,
    unitPrice : 0,
    title : '',
    name: '',
  });
  const componentRef = useRef();
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered list based on input
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const {host, getInvoices, customers, providers, agencies} = useContext(AppContext);
  const allCustomers = customers.concat(providers).concat(agencies);
  const [addPurchase, setAddPurchase] = useState(false);
  console.log(type);
  const [print, setPrint] = useState(false);

  useEffect(() => {
    const updatedPrice = formData.totalAmount * formData.unitPrice;
    setFormData(prev => ({ ...prev, price: updatedPrice }));
  }, [formData.unitPrice, formData.totalAmount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData(prev => {
      const updatedFormData = { ...prev, [name]: value };
  
      // Tính toán lại totalAmount nếu là zem, humidity, hoặc packaging
      if (name === 'zem' || name === 'humidity' || name === 'packaging') {
        const updatedTotalAmount = calculateTotalAmount({
          totalAmount: totalAmount,
          zem: Number(updatedFormData.zem),
          humidity: Number( updatedFormData.humidity),
          packaging: Number(updatedFormData.packaging),
        });
        updatedFormData.totalAmount = updatedTotalAmount;
      }
  
      return updatedFormData;
    });
  
    // Handle customer filtering
    if (name === 'name' && value !== '') {
      const filtered = allCustomers.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  };
  
  const handleCustomerSelect = (customer) => {
    setFormData({
      ...formData,
      customer: {name: customer.name, _id: customer._id},
      name: customer.name,
    
    });
    setSelectedCustomer(allCustomers);
    setFilteredCustomers([]); // Hide the suggestion list after selection
  };
  const handleSubmit = async () => {
    

    const invoiceData = {
      ...formData,  // Dữ liệu từ API
      _id: formData._id || '12345',
      price: Number(formData.price),
      humidity: Number(formData.humidity),
      zem: Number(formData.zem),
      totalAmount: Number(formData.totalAmount),
      packaging: Number(formData.packaging),
      unitPrice: Number(formData.unitPrice),  // Đảm bảo _id luôn có giá trị hợp lệ
    };

       
    const newBill = new Bill({ invoiceData: invoiceData, exportPrice: invoiceData.price } );
    console.log(newBill);
   
    try {
        await newBill.add(host, getInvoices); // Ensure host is passed here
        if(addPurchase){
          const purchase= new PurchaseInvoice({invoiceData:{
            _id : '12345',
            customer : newBill.customer,
            date: newBill.date,
            type: 'tiền',
            totalAmount: newBill.price,
            status: 'đã hoàn thành',
            note : `Là phiếu nhập tiền dựa trên phiếu nhập ${newBill.totalAmount} kg ${(newBill.type !='tiền' && newBill.type !='tiêu' && newBill.type !='cà tươi' && newBill.type !='cà nhân')? "Phân" : newBill.type}   `, 
            detailAmount : [],  // Mặc định là mảng rỗng nếu là null
            humidity : 0,       // Mặc định là 0 nếu là null
            zem : 0,            // Mặc định là 0 nếu là null
            packaging : '',
            unitPrice : 0,
            title : ''
    
          }, importPrice:0})
       
            await purchase.add(host, getInvoices);}
        OnClickCancel(); // Optionally close the form after submission
    } catch (error) {
      
        alert( error);
    }
 
 
     
       
   
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">
          Tạo Phiếu xuất
        </h2>
        <InputCmp title="Họ tên" name="name" value={formData.name} onChange={handleInputChange} placeholder="abc" />
        {filteredCustomers.length > 0 && (
        <ul className="suggestions-list font-semibold text-xl">
          {filteredCustomers.map(customer => (
            <li
              key={customer._id}
              onClick={() => handleCustomerSelect(customer)}
              className="suggestion-item text-xl hover:text-accept hover:text-2xl cursor-pointer "
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
<InputCmp title="Ngày xuất" name="date" value={formData.date} onChange={handleInputChange} placeholder="09/09/2024" />
<InputCmp title="Sản phẩm xuất" type={true} name="type" value={typeof(type) == 'object'  ? type.name : type} />
<InputCmp title="Số lượng" type={type!=="tiền"} name="totalAmount" value={formData.totalAmount.toLocaleString('vi-VN')} onChange={handleInputChange} placeholder={type=="tiền" ? "VND": "kg"} />
<div className="input-wrapper flex flex-row justify-between  ">
        <label className="font-bold text-2xl mb-2 mt-2">Tình trạng</label>
        <select className="font-semibold text-xl text-custom-red" name="status" value={formData.status} onChange={handleInputChange}>
          <option value="" disabled>Chọn tình trạng</option>
          <option value="hoàn thành">Đã hoàn thành</option>
          <option value="chưa hoàn thành">Chưa hoàn thành</option>
          <option value="gửi tại kho">Gửi tại kho</option>
        </select>
      </div>
      <InputCmp title="Ghi chú" type={true} name="note" value={formData.note}  placeholder="ghi chú" />
{type != "tiền" && <div>
  <InputCmp title="Đơn giá xuất" name="unitPrice" value={formData.unitPrice.toLocaleString('vi-VN') + 'VND/kg'} onChange={handleInputChange} placeholder="VND/kg" />
  <InputCmp title="Tổng số tiền" type={true} name="price" value={formData.price.toLocaleString('vi-VN')}  placeholder="VND" />
  <InputCmp title="Độ" name="humidity" value={formData.humidity} onChange={handleInputChange} placeholder="độ" />
<InputCmp title="Zem" name="zem" value={formData.zem} onChange={handleInputChange} placeholder="g" />
<InputCmp title="Bì" name="packaging" value={formData.packaging} onChange={handleInputChange} placeholder="kg" /> 

        <label className="font-bold text-2xl mb-2 mt-2">Tạo phiếu nhập tiền tương ứng không?</label>
        <div className="flex flex-row justify-between m-5">
         
          <label className="font-bold text-xl">Không </label> <ToggleButton isToggled={addPurchase} setIsToggled={setAddPurchase}/> <label className="font-bold text-xl">Có</label>
        </div></div>}
        <div>
        <ReactToPrint
        trigger={() => <button className="h-12 px-4 m-2 py-2 bg-accept text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 focus:bg-custom-green-600 focus:scale-130 text-black min-w-[120px] mb-5">In phiếu nhập</button>}
        content={() => componentRef.current}
      />
      <MyComponent ref={componentRef} invoice={formData}/>
        </div>
        <div className="flex justify-between m-2 mt-5">
          <ActivedButton text="Hủy" onClick={OnClickCancel} />
          <GreenButton text="Lưu" onClick={handleSubmit} />
        
        </div>
     
      </div>
    </div>
  );
}
