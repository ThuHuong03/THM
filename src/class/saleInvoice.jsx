import getCurrentDate from '../mathFormula/getCurrentDay';
import Customer from './customer';
import Invoice from './invoice';
import axios from 'axios';

export class SaleInvoice extends Invoice {
  constructor({invoiceData, salePrice=0}) {
    super(invoiceData);
    this.price= salePrice;
  }
  validate() {
    if (this.date === '') {
      return new Error('Mời nhập ngày');
    }
    if (this.totalAmount === 0) {
      return new Error('Mời nhập số lượng');
    }
  
    return null; // No error
  }
  async add(host, getInvoices, customer,setCustomer) {
   

    const billData = {
      "customer": {name: this.customer.name ||null, _id: this.customer._id|| null},
    "date": this.date || getCurrentDate(), 
    "type": this.type ,
    "totalAmount": this.totalAmount || 0,
    "salePrice": this.price || 0,
    "unitPrice": this.unitPrice ,
    "note": this.note || null,
 
  
  };
  const validationError = this.validate();
  if (validationError) {
    return Promise.reject(validationError);
  }
  try {
    const res = await axios.post(`${host}/saleInvoice`, billData);
    alert(res.data.message || 'Thêm phiếu bán thành công');

    getInvoices(); // Cập nhật danh sách hóa đơn
    console.log("add", res.data);

    // Trả về customer mới tạo từ dữ liệu phản hồi
    return new Customer(res.data.customer);
  } catch (err) {
    console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
    console.log("Full Error Response:", err.response);

    // Nếu lỗi, trả về giá trị customer cũ
    return customer;
  }
}
  
async update(host, getInvoices) {
  const id= this._id;
  const billData = {
  
    "customer": {name: this.customer.name ||null, _id: this.customer._id|| null},
  "date": this.date || getCurrentDate(),
  "type": this.type ,
  "totalAmount": this.totalAmount || 0,
  "salePrice": this.price || 0,

  "note": this.note || null,

};
const validationError = this.validate();
if (validationError) {
  return Promise.reject(validationError);
}
axios.put(`${host}/saleInvoice/${id}`, billData)
  .then((res) => {
    alert(res.data.message || 'Chỉnh sửa phiếu bán thành công');
    getInvoices();
  })
  .catch((err) => {
    console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
    console.log("Full Error Response:", err.response); // Log the full error response
  });
}



async delete(host, getInvoices) {
  const id= this._id;
 

axios.delete(`${host}/saleInvoice/${id}`)
  .then((res) => {
    alert(res.data.message || 'Xóa phiếu bán thành công');
    getInvoices();
  })
  .catch((err) => {
    console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
    console.log("Full Error Response:", err.response); // Log the full error response
  });
}
}
