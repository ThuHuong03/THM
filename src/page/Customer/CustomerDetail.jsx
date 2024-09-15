import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import { FaUserCircle } from "react-icons/fa";
import TextCmp from "../../components/TextCmp";
import { BillDiv, PurchaseInvoiceDiv, SaleInvoiceDiv } from "../../components/Bill";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import { SaleInvoice } from "../../class/saleInvoice";
import { Bill } from "../../class/bill";
import { PurchaseInvoice } from "../../class/purchaseInvoice";
import Customer from "../../class/customer";
import AddSalePurchase from "../Invoice/salePurchase/addSalePurChase";
import TableFooter from "../table/TableFooter";
export default function CustomerDetail() {
  const [type, setType] = useState(null);
  const OnClickButton = (Type) => {
   setType(Type);

  };
  const OnClickCancel= ()=>{
    getCustomer();
    setType(null);
  }
  const { host } = useContext(AppContext);
  const { id } = useParams();

  const [customerInvoices, setCustomerInvoices] = useState([]);
  const [customer, setCustomer] = useState(new Customer({ _id: id }));
const getCustomer= ()=>{
  axios
      .get(`${host}/customer/${id}`)
      .then((response) => {
        setCustomer(response.data.customer);
      }).catch((err) => {
        console.log(err);
      });

}
  const getCustomerInvoice = () => {
    axios
      .get(`${host}/customer/${id}`)
      .then((response) => {

      
        const newInvoices = response.data.invoices;
        console.log(response.data);
   if (newInvoices) {
        const invoicesToAdd = newInvoices.map((invoice) => {
         
          switch (invoice.title) {
            case "Phiếu Xuất":
              return new Bill({ invoiceData: invoice, exportPrice: invoice.exportPrice });
            case "Phiếu Nhập":
        return new PurchaseInvoice({ invoiceData: invoice, importPrice: invoice.salePrice });
            case "Phiếu Bán":
              return new SaleInvoice({ invoiceData: invoice, salePrice: invoice.salePrice });
            default:
              return null; 
          }
        }).filter(invoice => invoice !== null);  

       
        setCustomerInvoices(invoicesToAdd);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [searchText, setSearchText]= useState('');
  const [currentPage, setCurrentPage] = useState( 1);
  const itemsPerPage = 10;
 
  const totalPages = Math.ceil(customerInvoices.length / itemsPerPage);

  // Hàm tính toán dữ liệu cho trang hiện tại
  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = customerInvoices.filter((ele) =>
    ele.date.toLowerCase().includes(searchText.toLowerCase().trim()) ||
    searchText === ''
  );

  const paginatedData = paginate(filteredData, currentPage, itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
 
    }
  };
 useEffect (() => {console.log("getCustomerInvoices");
  if (customerInvoices.length === 0) {
    getCustomerInvoice();
  } else {
    console.log("Invoices already fetched");
  }
  getCustomer();
  setType(null);
}, []); 
  return (
    <div>
      <div className="min-h-screen h-auto bg-creamy-white">
        <NavBar isActive={1} />
        <SearchBar placeholder="Nhập ngày cần tìm" setSearchText={setSearchText}/>
        <div className="ml-[110px] mr-[110px]">
          <div className="flex flex-row justify-between items-center">
            <FaUserCircle color="#672F2F" size={130} />
            <label> Khách hàng</label>
            <div className="grid grid-cols-2 grid-flow-row gap-10 gap-y-5 w-[70%]">
              <TextCmp title="Họ tên:" text={customer.name} />
              <TextCmp
                title="Tổng cà tươi"
                text={customer.totalRawCF + " kg"}
                OnClickButton={()=>OnClickButton("cà tươi")}
                button={true}
              />

              <TextCmp title="Địa chỉ:" text={customer.address} />
              <TextCmp
                title="Tổng cà nhân"
                text={customer.totalCF +" kg"}
                OnClickButton={()=>OnClickButton("cà nhân")}
                button={true}
              />
              <TextCmp
                title="Tài khoản ngân hàng"
                text={customer.bankAccount}
              />
              <TextCmp
                title="Tổng tiêu"
                text={customer.totalPepper +" kg"}
                OnClickButton={()=>OnClickButton("tiêu")}
                button={true}

              />
              <TextCmp title="Số điện thoại" text={customer.phoneNumber} />
              <TextCmp title="Tổng tiền gửi" text={customer.credit +" VND"} />
              <TextCmp title="Ghi chú" text={customer.note} />
              <TextCmp title="Tổng tiền nợ" text={customer.debit +" VND"} />
            </div>
           {type != null&&  <AddSalePurchase setCustomer={setCustomer} customer={customer} type={type} OnClickCancel={OnClickCancel}  getCustomerInvoice={getCustomerInvoice}/>}
          </div>

          <div>
          {
           
            paginatedData.map((invoice, index)=>{
              
              switch(invoice.title){
              case "Phiếu Xuất": return <BillDiv invoice={invoice}/>; 
              case "Phiếu Nhập": return <PurchaseInvoiceDiv invoice={ invoice}/>; 
              case "Phiếu Bán": return <SaleInvoiceDiv invoice={invoice}/>; 
              default: break;
              }

            })
          }
        
        <div className="flex justify-end w-full pr-[110px]">
        <TableFooter page={currentPage} handlePageChange={handlePageChange} totalPages={totalPages}/>
        
      </div>
      
          </div>
        </div>
      </div>
    </div>
  );
}
