import axios from "axios";

export default class Agency {
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

  // Method to update agency details
  updateDetails(host, getAgencies) {
    const agencyData = {
      name: this.name,
      address: this.address || null,
      phoneNumber: this.phoneNumber || null,
      bankAccount: this.bankAccount || null,
      note: this.note || null,
      debit: this.debit || 0,
      credit: this.credit || 0,
    };

    axios
      .put(`${host}/agency/${this._id}`, agencyData)
      .then((res) => {
        alert("Đại lý cập nhật thành công");
        getAgencies();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }

  // Method to delete agency
  delete(host, getAgencies) {
    axios
      .delete(`${host}/agency/${this._id}`)
      .then((res) => {
        alert("Xóa đại lý thành công");
        getAgencies();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }

  // Method to add new agency
  add(host, getAgencies) {
    const agencyData = {
      name: this.name,
      address: this.address || null,
      phoneNumber: this.phoneNumber || null,
      bankAccount: this.bankAccount || null,
      note: this.note || null,
      debit: this.debit || 0,
      credit: this.credit || 0,
    };

    if (this.name === "") {
      alert("Please enter agency name");
      return;
    }

    axios.post(`${host}/agency`, agencyData)
      .then((res) => {
        alert(res.data.message || 'Thêm đại lý thành công');
        getAgencies();
      })
      .catch((err) => {
        console.error("Error:", err.response?.data?.message || err.response?.data || 'An error occurred');
        console.log("Full Error Response:", err.response); // Log the full error response
      });
  }
}
