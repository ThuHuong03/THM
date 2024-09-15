import React, { useContext, useEffect, useRef, useState } from "react";
import InputCmp from "../../../components/InputCmp";
import {
  ActivedButton,
  GreenButton,
  ToggleButton,
} from "../../../components/Button";
import { AppContext } from "../../../context/appContext";
import { Bill } from "../../../class/bill";
import Invoice from "../../../class/invoice";
import { calculateTotalAmount } from "../../../mathFormula/calculateTotalAmount";
import getCurrentDate from "../../../mathFormula/getCurrentDay";
import MyComponent from "../PDF/print";
import { SaleInvoice } from "../../../class/saleInvoice";
import ReactToPrint from "react-to-print";

export default function AddSalePurchase ({ OnClickCancel, type, customer , setCustomer, getCustomerInvoice }) {

   const [formData, setFormData] = useState({
    customer :{name: customer.name, _id: customer._id},
    _id: '',
   price: 0,
    date: getCurrentDate(),
    type: type,
    totalAmount: 0,
    status : '',
    unitPrice: 0,
    note : '',  
    name: customer.name,
  });
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered list based on input

  const {host, getInvoices, customers, providers, agencies} = useContext(AppContext);
  const allCustomers = customers.concat(providers).concat(agencies);
  const [addBill, setAddBill] = useState(false);
  const componentRef= useRef();

  
  useEffect(() => {
    const updatedPrice = formData.totalAmount * formData.unitPrice;
    setFormData(prev => ({ ...prev, price: updatedPrice }));
  }, [formData.unitPrice, formData.totalAmount]);
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
      status: addBill? 'hoàn thành' :'chưa lấy tiền'

    });
  
    

    
    
  };

  const handleSubmit = async () => {
    

    const invoiceData = {
      ...formData, 
    
      totalAmount: Number(formData.totalAmount),
      price: Number(formData.price),
      unitPrice: Number(formData.unitPrice), 
    };

       
    const newPurchaseInvoice = new SaleInvoice({ invoiceData: invoiceData, salePrice: invoiceData.price } );
   
   
    try {
      
        // console.log(result ,"result");
        setCustomer("result",await newPurchaseInvoice.add(host, getInvoices,customer));

        if(addBill){
          const bill= new Bill({invoiceData:{
            _id : '12345',
            customer : newPurchaseInvoice.customer,
            date: newPurchaseInvoice.date,
            type: 'tiền',
            totalAmount: newPurchaseInvoice.price,
            status: 'hoàn thành',
            note : `Là phiếu xuất tiền dựa trên phiếu bán ${newPurchaseInvoice.totalAmount} kg ${newPurchaseInvoice.type} với giá ${newPurchaseInvoice.unitPrice} VND/kg`, 
         
    
          }, importPrice:0})
          await bill.add(host, getInvoices); }
        // setCustomer(result); 
        getInvoices();
        getCustomerInvoice();
        OnClickCancel(); 
       
    } catch (error) {
      
        alert( error);
    }
   
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-dark-rust">
          Tạo Phiếu bán
        </h2>
        <InputCmp title="Họ tên" name="name" value={formData.name} placeholder="abc" />
        
<InputCmp title="Ngày xuất" name="date" value={formData.date} onChange={handleInputChange} placeholder="09/09/2024" />
<InputCmp title="Sản phẩm xuất" type={true} name="type" value={typeof(type) == 'object'  ? type : type} />
<InputCmp title="Số lượng"  name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} placeholder="kg" />
<InputCmp title="Ghi chú" type={true} name="note" value={formData.note}  placeholder="ghi chú" />
<div>
<InputCmp title="Đơn giá xuất" name="unitPrice" value={formData.unitPrice} onChange={handleInputChange} placeholder="VND/kg" />
<InputCmp title="Tổng số tiền" type={true} name="price" value={formData.price}  placeholder="VND" />


        <label className="font-bold text-2xl mb-2 mt-2">Tạo phiếu xuất tiền tương ứng không?</label>
        <div className="flex flex-row justify-between m-5">
         
          <label className="font-bold text-xl">Không </label> <ToggleButton isToggled={addBill} setIsToggled={setAddBill}/> <label className="font-bold text-xl">Có</label>
        </div></div>
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
