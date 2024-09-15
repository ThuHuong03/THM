import ReactToPrint from 'react-to-print';
import getCurrentDate from '../mathFormula/getCurrentDay';
import Invoice from './invoice';
import axios from 'axios';
import { useRef } from 'react';
import InvoicePDF from '../page/Invoice/PDF/PrintPdf';

export class Bill extends Invoice {
  constructor({invoiceData, exportPrice=0}) {
    super(invoiceData);
    this.price = exportPrice;
  }
  validate() {
    if (this.date === '') {
      return new Error('Mời nhập ngày');
    }
    if (this.totalAmount === 0) {
      return new Error('Mời nhập số lượng');
    }
    if (this.status == '') {
      return new Error('Mời chọn trạng thái');
    }
    return null; // No error
  }
  async add(host, getInvoices, setCustomer) {
   

    const billData = {
      "customer": {name: this.customer.name ||null, _id: this.customer._id|| null},
    "date": this.date || getCurrentDate(),
    "type": this.type ,
    "totalAmount": this.totalAmount || 0,
    "exportPrice": this.price || 0,
    "status": this.status ,
    "note": this.note || null,
    "detailAmount": this.detailAmount || [],
    "humidity": this.humidity || null,
    "zem": this.zem || null,
    "packaging": this.packaging || null
  };
  const validationError = this.validate();
  if (validationError) {
    return Promise.reject(validationError);
  }
  axios.post(`${host}/bill`, billData)
    .then((res) => {
      alert(res.data.message || 'Thêm hóa đơn thành công');
      getInvoices();
      setCustomer(res.data.customer)
    })
    .catch((err) => {
      console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
      console.log("Full Error Response:", err.response); // Log the full error response
    });
}
  


print() {
 

  return (
   <InvoicePDF/>
  );
}
  async update(host, getInvoices) {
    const id= this._id;
    const billData = {
    
      "customer": {name: this.customer.name ||null, _id: this.customer._id|| null},
    "date": this.date || getCurrentDate(),
    "type": this.type ,
    "totalAmount": this.totalAmount || 0,
    "exportPrice": this.price || 0,
    "status": this.status ,
    "note": this.note || null,
    "detailAmount": this.detailAmount || [],
    "humidity": this.humidity || null,
    "zem": this.zem || null,
    "packaging": this.packaging || null
  };
  const validationError = this.validate();
  if (validationError) {
    return Promise.reject(validationError);
  }
  axios.put(`${host}/bill/${id}`, billData)
    .then((res) => {
      alert(res.data.message || 'Chỉnh sửa hóa đơn thành công');
      getInvoices();
    })
    .catch((err) => {
      console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
      console.log("Full Error Response:", err.response); // Log the full error response
    });
}
  
  

  async delete(host, getInvoices) {
    const id= this._id;
   
 
  axios.delete(`${host}/bill/${id}`)
    .then((res) => {
      alert(res.data.message || 'Xóa hóa đơn thành công');
      getInvoices();
    })
    .catch((err) => {
      console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
      console.log("Full Error Response:", err.response); // Log the full error response
    });
  }
}
