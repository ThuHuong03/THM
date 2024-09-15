import axios from "axios";

export default class Customer {
  constructor({
    _id,
    name,
    totalRawCF,
    totalCF,
    totalPepper,
    debit,
    credit,
    address,
    phoneNumber,
    bankAccount,
    note,
  }) {
    this.name = name;
    this.totalRawCF = totalRawCF;
    this.totalCF = totalCF;
    this.totalPepper = totalPepper;
    this.debit = debit;
    this.credit = credit;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.bankAccount = bankAccount;
    this.note = note;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this._id = _id;
  }

  // Method to display customer details
  displayInfo() {
    return `
            Name: ${this.name}
            Total Raw CF: ${this.totalRawCF}
            Total CF: ${this.totalCF}
            Total Pepper: ${this.totalPepper}
            Debit: ${this.debit}
            Credit: ${this.credit}
            Address: ${this.address}
            Phone Number: ${this.phoneNumber}
            Bank Account: ${this.bankAccount}
            Note: ${this.note}
            Created At: ${this.createdAt.toISOString()}
            Updated At: ${this.updatedAt.toISOString()}
        `;
  }

  // Method to update customer details
  updateDetails(
    
    host, getCustomers
  ) {
    const _id= this._id
       const customerData = {
        
        "name": this.name ,
      "totalRawCF": this.totalRawCF || 0,
      "totalCF": this.totalCF || 0,
      "totalPepper": this.totalPepper || 0,
      "debit": this.debit || 0,
      "credit": this.credit || 0,
      "address": this.address || null,
      "phoneNumber": this.phoneNumber || null,
      "bankAccount": this.bankAccount || null,
      "note": this.note || null
    };
  
    axios
      .put(`${host}/customer/${_id}`, customerData)
      .then((res) => {
        alert("Khách hàng đã được cập nhật thành công");
        getCustomers();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }

  delete(
    _id,
    host, getCustomers
  ) {
    
      
  
    axios
      .delete(`${host}/customer/${_id}`)
      .then((res) => {
        alert("Khách hàng đã được xóa thành công");
        getCustomers();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }

  add(host, getCustomers) {
    const customerData = {
        "name": this.name ,
      "totalRawCF": this.totalRawCF || 0,
      "totalCF": this.totalCF || 0,
      "totalPepper": this.totalPepper || 0,
      "debit": this.debit || 0,
      "credit": this.credit || 0,
      "address": this.address || null,
      "phoneNumber": this.phoneNumber || null,
      "bankAccount": this.bankAccount || null,
      "note": this.note || null
    };
  
    if(this.name =="")
        {alert("Mời nhập tên khách hàng"); return;}
  
    axios.post(`${host}/customer`, customerData)
      .then((res) => {
        alert(res.data.message || 'Thêm khách hàng thành công');
        getCustomers();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }
  
}
