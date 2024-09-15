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
import Provider from "../../class/provider";
import TableFooter from "../table/TableFooter";
export default function ProviderDetail() {
  const OnClickButton = () => {
    console.log("OnClickButton");

  };
   const { host } = useContext(AppContext);
  const { id } = useParams();
 const [searchText, setSearchText]= useState('');
  const [providerInvoices, setProviderInvoices] = useState([]);
  const [provider, setProvider] = useState(new Provider({ _id: id }));

  const getProvider = () => {
    axios
      .get(`${host}/provider/${id}`)
      .then((response) => {
   
        setProvider(new Provider(response.data.provider));
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

       
        setProviderInvoices(invoicesToAdd);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [currentPage, setCurrentPage] = useState( 1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(providerInvoices.length / itemsPerPage);

  // Hàm tính toán dữ liệu cho trang hiện tại
  const paginate = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const filteredData = providerInvoices.filter((ele) =>
    ele.date.toLowerCase().includes(searchText.toLowerCase().trim()) ||
    searchText === ''
  );

  const paginatedData = paginate(filteredData, currentPage, itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
 
    }
  };
 useEffect (() => {console.log("getProviderInvoices");
  if (providerInvoices.length === 0) {
    getProvider();
  } else {
    console.log("Invoices already fetched");
  }
}, []); 
  return (
    <div>
      <div className="min-h-screen h-auto bg-creamy-white">
        <NavBar isActive={3} />
        <SearchBar setSearchText={setSearchText}  placeholder="Nhập ngày cần tìm" />
        <div className="ml-[110px] mr-[110px]">
          <div className="flex flex-row justify-between items-center">
            <FaUserCircle color="#672F2F" size={130} />
            <div className="grid grid-cols-2 grid-flow-row gap-10 gap-y-5 w-[70%]">
              <TextCmp title="Họ tên:" text={provider.name} />

              <TextCmp title="Địa chỉ:" text={provider.address} />
              <TextCmp title="Tài khoản ngân hàng" text={provider.bankAccount}/>
              <TextCmp title="Số điện thoại" text={provider.phoneNumber} />
              <TextCmp title="Tổng tiền gửi" text={provider.credit +" VND"} />
              <TextCmp title="Tổng tiền nợ" text={provider.debit + " VND"} />
              <TextCmp title="Ghi chú" text={provider.note} />
            </div>
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
