import axios from 'axios';

export default class Invoice {
  constructor({
    _id = '12345',
    customer = {},
    date= '',
    type= '',
    totalAmount= '',
    status= '',
    note = '',  // Đặt giá trị mặc định nếu là null
    detailAmount = [],  // Mặc định là mảng rỗng nếu là null
    humidity = 0,       // Mặc định là 0 nếu là null
    zem = 0,            // Mặc định là 0 nếu là null
    packaging = '',
    unitPrice = 0,
    title = '',
  }) {
    this._id = _id||'12345';
    this.customer = customer || {};  // Nếu customer null, đặt là object rỗng
    this.date = date;
    this.type = type;
    this.totalAmount = totalAmount;
    this.status = status;
    this.note = note;
    this.detailAmount = detailAmount;
    this.humidity = humidity;
    this.zem = zem;
    this.packaging = packaging;
    this.unitPrice = unitPrice;
    this.title = title;
  }

  displayInfo() {
    return `
      ID: ${this._id}
      Customer: ${JSON.stringify(this.customer)}
      Date: ${this.date}
      Type: ${this.type}
      Total Amount: ${this.totalAmount}
      Status: ${this.status}
      Note: ${this.note}
      Detail Amount: ${this.detailAmount}
      Humidity: ${this.humidity}
      Zem: ${this.zem}
      Packaging: ${this.packaging}
    
      Unit Price: ${this.unitPrice}
  

    `;
  }

  // Common methods to be overridden in subclasses
  async add(host) {
    throw new Error('Add method not implemented');
  }

  async update(host) {
    throw new Error('Update method not implemented');
  }

  async delete(host) {
    throw new Error('Delete method not implemented');
  }
  async print ()
  {
    throw new Error('Print method not implemented');
  }

  
}

