import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import { FaUserCircle } from "react-icons/fa";
import TextCmp from "../../components/TextCmp";
import {BillDiv, PurchaseInvoiceDiv, SaleInvoiceDiv} from '../../components/Bill'
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import { Bill } from "../../class/bill";
import { PurchaseInvoice } from "../../class/purchaseInvoice";
import { SaleInvoice } from "../../class/saleInvoice";
import Agency from "../../class/agency";
import TableFooter from "../table/TableFooter";
export default function AgencyDetail() {
  const OnClickButton = () => {
    console.log("OnClickButton");

  };
   const { host } = useContext(AppContext);
  const { id } = useParams();
 
  const [agencyInvoices, setAgencyInvoices] = useState([]);
  const [agency, setAgency] = useState(new Agency({ _id: id }));

  const getAgency = () => {
    axios
      .get(`${host}/agency/${id}`)
      .then((response) => {
        setAgency(new Agency(response.data.agency));
        const newInvoices = response.data.invoices;
        console.log(newInvoices);
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

       
        setAgencyInvoices(invoicesToAdd);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [searchText, setSearchText]= useState('');
  const [currentPage, setCurrentPage] = useState( 1);
  const itemsPerPage = 10;
 
  const totalPages = Math.ceil(agencyInvoices.length / itemsPerPage);

  // Hàm tính toán dữ liệu cho trang hiện tại
  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = agencyInvoices.filter((ele) =>
    ele.date.toLowerCase().includes(searchText.toLowerCase().trim()) ||
    searchText === ''
  );

  const paginatedData = paginate(filteredData, currentPage, itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
 
    }
  };
 useEffect (() => {console.log("getAgencyInvoices");
  if (agencyInvoices.length === 0) {
    getAgency();
  } else {
    console.log("Invoices already fetched");
  }
}, []); 
  return (
    <div>
      <div className="min-h-screen h-auto bg-creamy-white">
        <NavBar isActive={2} />
        <SearchBar placeholder="Nhập ngày cần tìm" setSearchText={setSearchText}/>
        <div className="ml-[110px] mr-[110px]">
          <div className="flex flex-row justify-between items-center">
            <FaUserCircle color="#672F2F" size={130} />
            <div className="grid grid-cols-2 grid-flow-row gap-10 gap-y-5 w-[70%]">
              <TextCmp title="Họ tên:" text={agency.name} />

              <TextCmp title="Địa chỉ:" text={agency.address} />
              <TextCmp title="Tài khoản ngân hàng" text={agency.bankAccount}/>
              <TextCmp title="Số điện thoại" text={agency.phoneNumber} />
              <TextCmp title="Tổng tiền gửi" text={agency.credit} />
              <TextCmp title="Tổng tiền nợ" text={agency.debit} />
              <TextCmp title="Ghi chú" text={agency.note} />
            </div>
          </div>

          <div>
          {
           
            agencyInvoices.map((invoice, index)=>{
              
              switch(invoice.title){
              case "Phiếu Xuất": return <BillDiv invoice={invoice}/>; 
              case "Phiếu Nhập": return <PurchaseInvoiceDiv invoice={ invoice}/>; 
              case "Phiếu Bán": return <SaleInvoiceDiv invoice={invoice}/>; 
              default: break;
              }

            })
          }<div className="flex justify-end w-full pr-[110px]">
          <TableFooter page={currentPage} handlePageChange={handlePageChange} totalPages={totalPages}/>
          
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
