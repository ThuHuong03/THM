import React, { useContext, useRef, useState } from "react";
import InputCmp from "../../../components/InputCmp";
import {
  ActivedButton,
  GreenButton,
  ToggleButton,
} from "../../../components/Button";
import { AppContext } from "../../../context/appContext";
import { Bill } from "../../../class/bill";
import { calculateTotalAmount } from "../../../mathFormula/calculateTotalAmount";
import { PurchaseInvoice } from "../../../class/purchaseInvoice";
import { SaleInvoice } from "../../../class/saleInvoice";
import ReactToPrint from "react-to-print";
import MyComponent from "../PDF/print";


function EditBill({ OnClickCancel, type, detailAmount, totalAmount , bill }) {

   const [formData, setFormData] = useState({
    customer :bill.customer,
    _id: bill._id,
   price: bill.price,
    date: bill.date,
    type: bill.type,
    totalAmount: bill.totalAmount,
    status : bill.status,
    note : bill.note,  
   
    humidity : bill.humidity,      
    zem : bill.zem,            
    packaging :bill.packaging,
    unitPrice : bill.unitPrice,
    title : bill.title,
    name: bill.customer.name,
  });
  console.log(bill)
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered list based on input
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const {host, getInvoices, customers, providers, agencies} = useContext(AppContext);
  const allCustomers = customers.concat(providers).concat(agencies);
  const componentRef= useRef();
  const [print, setPrint] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value != '') {
      // Filter customers based on input value
      const filtered = allCustomers.filter(customer =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      );
      
      setFilteredCustomers(filtered);
    }
    else setFilteredCustomers([]);
    
    

    setFormData({
      ...formData,
      [name]: value,
      price: formData.totalAmount * formData.unitPrice,

    });
    if(name === 'zem' || name === 'humidity' || name === 'packaging') {
    

     
       setFormData({
      ...formData,
      [name]: value,
      totalAmount:  calculateTotalAmount({totalAmount: totalAmount, zem: formData.zem, humidity: formData.humidity, packaging: formData.packaging}),
      price: formData.totalAmount * formData.unitPrice,
      
    });
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
        await newBill.update(host, getInvoices); // Ensure host is passed here
     
        OnClickCancel(); // Optionally close the form after submission
    } catch (error) {
      
        alert( error);
    }
    if(print)
      try {
    alert("print")
        await newBill.print();
      } catch (error) {
        console.log(error);
      }
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">
          Chỉnh sửa Phiếu xuất
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
<InputCmp title="Sản phẩm xuất" type={true} name="type" value={typeof(bill.type) == 'object'  ? bill.type.name : bill.type} />
<InputCmp title="Số lượng" type={type!=="tiền"} name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} placeholder={type=="tiền" ? "VND": "kg"} />
<div className="input-wrapper flex flex-row justify-between  ">
        <label className="font-bold text-2xl mb-2 mt-2">Tình trạng</label>
        <select className="font-semibold text-xl" name="status" value={formData.status} onChange={handleInputChange}>
          <option value="" disabled>Chọn tình trạng</option>
          <option value="hoàn thành">Đã hoàn thành</option>
          <option value="chưa hoàn thành">Chưa hoàn thành</option>
          <option value="gửi tại kho">Gửi tại kho</option>
        </select>
      </div>
      <InputCmp title="Ghi chú" type={true} name="note" value={formData.note}  placeholder="ghi chú" />
{bill.type != "tiền" && <div>
  <InputCmp title="Đơn giá xuất" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="VND/kg" />
  <InputCmp title="Tổng số tiền" type={true} name="price" value={formData.price}  placeholder="VND" />
  <InputCmp title="Độ" name="humidity" value={formData.humidity} onChange={handleInputChange} placeholder="độ" />
<InputCmp title="Zem" name="zem" value={formData.zem} onChange={handleInputChange} placeholder="g" />
<InputCmp title="Bì" name="packaging" value={formData.packaging} onChange={handleInputChange} placeholder="kg" /> 
</div>}
<ReactToPrint
        trigger={() => <button className="h-12 px-4 m-2 py-2 bg-accept text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 focus:bg-custom-green-600 focus:scale-130 text-black min-w-[120px] mb-5">In phiếu xuất</button>}
        content={() => componentRef.current}
      />
      <MyComponent ref={componentRef} invoice={formData}/>
        <div className="flex justify-between m-2 mt-5">
          <ActivedButton text="Hủy" onClick={OnClickCancel} />
          <GreenButton text="Lưu" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

 function EditPurchase ({ OnClickCancel, type, detailAmount, totalAmount, purchaseInvoice }) {

  const [formData, setFormData] = useState({
  customer :purchaseInvoice.customer,
    _id: purchaseInvoice._id,
   price: purchaseInvoice.price,
    date: purchaseInvoice.date,
    type: purchaseInvoice.type,
    totalAmount: purchaseInvoice.totalAmount,
    status : purchaseInvoice.status,
    note : purchaseInvoice.note,  
   
    humidity : purchaseInvoice.humidity,      
    zem : purchaseInvoice.zem,            
    packaging :purchaseInvoice.packaging,
    unitPrice : purchaseInvoice.unitPrice,
    title : purchaseInvoice.title,
    name: purchaseInvoice.customer.name,
 });
 const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered list based on input
 const [selectedCustomer, setSelectedCustomer] = useState(null); 
 const {host, getInvoices, customers, providers, agencies} = useContext(AppContext);
 const allCustomers = customers.concat(providers).concat(agencies);
 const [addPurchase, setAddPurchase] = useState(false);
 const componentRef= useRef();
 const [print, setPrint] = useState(false);
 const handleInputChange = (e) => {
   const { name, value } = e.target;
   if (name === 'name' && value != '') {
     // Filter customers based on input value
     const filtered = allCustomers.filter(customer =>
       customer.name.toLowerCase().includes(value.toLowerCase())
     );
     
     setFilteredCustomers(filtered);
   }
   else setFilteredCustomers([]);
   
   

   setFormData({
     ...formData,
     [name]: value,
     price: formData.totalAmount * formData.unitPrice,

   });
   if(name === 'zem' || name === 'humidity' || name === 'packaging') {
   

    
      setFormData({
     ...formData,
     [name]: value,
     totalAmount:  calculateTotalAmount({totalAmount: totalAmount, zem: formData.zem, humidity: formData.humidity, packaging: formData.packaging}),
     price: formData.totalAmount * formData.unitPrice,
     
   });
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
     price: Number(formData.price),
     humidity: Number(formData.humidity),
     zem: Number(formData.zem),
     totalAmount: Number(formData.totalAmount),
     packaging: Number(formData.packaging),
     unitPrice: Number(formData.unitPrice),  // Đảm bảo _id luôn có giá trị hợp lệ
   };

      
   const newPurchaseInvoice = new PurchaseInvoice({ invoiceData: invoiceData, importPrice: invoiceData.price } );
   console.log(newPurchaseInvoice);
  
   try {
       await newPurchaseInvoice.update(host, getInvoices); // Ensure host is passed here
    
       OnClickCancel(); // Optionally close the form after submission
   } catch (error) {
     
       alert( error);
   }
};
 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
     <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
       <h2 className="text-3xl font-bold mb-4 text-dark-rust">
         Tạo Phiếu nhập
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
<InputCmp title="Sản phẩm xuất" type={true} name="type" value={typeof(purchaseInvoice.type) == 'object'  ? purchaseInvoice.type.name : purchaseInvoice.type} />
<InputCmp title="Số lượng" type={type!=="tiền"} name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} placeholder={type=="tiền" ? "VND": "kg"} />
<div className="input-wrapper flex flex-row justify-between  ">
       <label className="font-bold text-2xl mb-2 mt-2">Tình trạng</label>
       <select className="font-semibold text-xl" name="status" value={formData.status} onChange={handleInputChange}>
         <option value="" disabled>Chọn tình trạng</option>
         <option value="hoàn thành">Đã hoàn thành</option>
         <option value="chưa hoàn thành">Chưa hoàn thành</option>
         <option value="gửi tại kho">Gửi tại kho</option>
       </select>
     </div>
     <InputCmp title="Ghi chú" type={true} name="note" value={formData.note}  placeholder="ghi chú" />
{type != "tiền" && <div>
  <InputCmp title="Đơn giá xuất" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="VND/kg" />
  <InputCmp title="Tổng số tiền" type={true} name="price" value={formData.price}  placeholder="VND" />
 <InputCmp title="Độ" name="humidity" value={formData.humidity} onChange={handleInputChange} placeholder="độ" />
<InputCmp title="Zem" name="zem" value={formData.zem} onChange={handleInputChange} placeholder="g" />
<InputCmp title="Bì" name="packaging" value={formData.packaging} onChange={handleInputChange} placeholder="kg" /> 

       <label className="font-bold text-2xl mb-2 mt-2">Tạo phiếu xuất tiền tương ứng không?</label>
       <div className="flex flex-row justify-between m-5">
        
         <label className="font-bold text-xl">Không </label> <ToggleButton isToggled={addPurchase} setIsToggled={setAddPurchase}/> <label className="font-bold text-xl">Có</label>
       </div></div>}
       <ReactToPrint
        trigger={() => <button className="h-12 px-4 m-2 py-2 bg-accept text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 focus:bg-custom-green-600 focus:scale-130 text-black min-w-[120px] mb-5">In phiếu nhập</button>}
        content={() => componentRef.current}
      />
      <MyComponent ref={componentRef} invoice={formData}/>
       <div className="flex justify-between m-2 mt-5">
         <ActivedButton text="Hủy" onClick={OnClickCancel} />
         <GreenButton text="Lưu" onClick={handleSubmit} />
       </div>
     </div>
   </div>
 );
}

function EditSale ({ OnClickCancel, type, customer , saleInvoice }) {

  const [formData, setFormData] = useState({
   customer :saleInvoice.customer,
   _id: saleInvoice._id,
  price: saleInvoice.price,
   date: saleInvoice.date,
   type: saleInvoice.type,
   totalAmount: saleInvoice.totalAmount,
   status : saleInvoice.status,
   unitPrice: saleInvoice.unitPrice,
   note : saleInvoice.note,  
   name: saleInvoice.customer.name,
 });

 const {host, getInvoices, customers, providers, agencies} = useContext(AppContext);
 const allCustomers = customers.concat(providers).concat(agencies);
 const [addPurchase, setAddPurchase] = useState(false);

 const componentRef= useRef();
 const handleInputChange = (e) => {
   const { name, value } = e.target;
 
   
   

   setFormData({
     ...formData,
     [name]: value,
     price: formData.totalAmount * formData.unitPrice,

   });
 
   

   
   
 };

 const handleSubmit = async () => {
   

   const invoiceData = {
     ...formData, 
   
     totalAmount: Number(formData.totalAmount),
 
     unitPrice: Number(formData.unitPrice),  // Đảm bảo _id luôn có giá trị hợp lệ
   };

      
   const newPurchaseInvoice = new SaleInvoice({ invoiceData: invoiceData, importPrice: invoiceData.price } );
   console.log(newPurchaseInvoice);
  
   try {
       await newPurchaseInvoice.update(host, getInvoices); // Ensure host is passed here
      
       OnClickCancel(); 
   } catch (error) {
     
       alert( error);
   }
};
 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
     <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
       <h2 className="text-3xl font-bold mb-4 text-dark-rust">
         Chỉnh sửa Phiếu bán
       </h2>
       <InputCmp title="Họ tên" name="name" value={formData.name} placeholder="abc" />
       
<InputCmp title="Ngày xuất" name="date" value={formData.date} onChange={handleInputChange} placeholder="09/09/2024" />
<InputCmp title="Sản phẩm xuất" type={true} name="type" value={typeof(type) == 'object'  ? saleInvoice.type : saleInvoice.type} />
<InputCmp title="Số lượng"  name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} placeholder="kg" />

<div>
 <InputCmp title="Đơn giá xuất" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="VND/kg" />
<InputCmp title="Tổng số tiền" type={true} name="price" value={formData.price}  placeholder="VND" />

<InputCmp title="Ghi chú" type={true} name="note" value={formData.note}  placeholder="ghi chú" />

       <label className="font-bold text-2xl mb-2 mt-2">Tạo phiếu xuất tiền tương ứng không?</label>
       <div className="flex flex-row justify-between m-5">
        
         <label className="font-bold text-xl">Không </label> <ToggleButton isToggled={addPurchase} setIsToggled={setAddPurchase}/> <label className="font-bold text-xl">Có</label>
       </div></div>
       <ReactToPrint
        trigger={() => <button className="h-12 px-4 m-2 py-2 bg-accept text-black rounded-lg text-lg font-bold hover:bg-custom-green-200 focus:bg-custom-green-600 focus:scale-130 text-black min-w-[120px] mb-5">In phiếu bán</button>}
        content={() => componentRef.current}
      />
      <MyComponent ref={componentRef} invoice={formData}/>
       <div className="flex justify-between m-2 mt-5">
         <ActivedButton text="Hủy" onClick={OnClickCancel} />
         <GreenButton text="Lưu" onClick={handleSubmit} />
       </div>
     </div>
   </div>
 );
}



export  {EditBill, EditPurchase, EditSale}