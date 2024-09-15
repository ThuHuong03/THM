import axios from "axios";

export default class Provider {
  constructor({
    _id,
    name,
    address,
    phoneNumber,
    bankAccount,
    note,
    debit,
    credit,
  }) {
    this.name = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.bankAccount = bankAccount;
    this.note = note;
    this.debit = debit;
    this.credit = credit;
    this._id = _id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }


  displayInfo() {
    return `
            Name: ${this.name}
            Address: ${this.address}
            Phone Number: ${this.phoneNumber}
            Bank Account: ${this.bankAccount}
            Note: ${this.note}
            Debit: ${this.debit}
            Credit: ${this.credit}
            Created At: ${this.createdAt.toISOString()}
            Updated At: ${this.updatedAt.toISOString()}
        `;
  }


  updateDetails(host, getProviders) {
    const providerData = {
      name: this.name,
      address: this.address || null,
      phoneNumber: this.phoneNumber || null,
      bankAccount: this.bankAccount || null,
      note: this.note || null,
      debit: this.debit || 0,
      credit: this.credit || 0,
    };

    axios
      .put(`${host}/provider/${this._id}`, providerData)
      .then((res) => {
        alert("Nhà cung cấp cập nhật thành công");
        getProviders();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }

  // Method to delete Provider
  delete(host, getProviders) {
    axios
      .delete(`${host}/provider/${this._id}`)
      .then((res) => {
        alert("Xóa nhà cung cấp thành công");
        getProviders();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }

  // Method to add new Provider
  add(host, getProviders) {
    const providerData = {
      name: this.name,
      address: this.address || null,
      phoneNumber: this.phoneNumber || null,
      bankAccount: this.bankAccount || null,
      note: this.note || null,
      debit: this.debit || 0,
      credit: this.credit || 0,
    };

    if (this.name === "") {
      alert("Please enter Provider name");
      return;
    }

    axios.post(`${host}/provider`, providerData)
      .then((res) => {
        alert(res.data.message || 'Thêm nhà cung cấp thành công');
        getProviders();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }
}
