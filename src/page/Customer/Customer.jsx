import React, { useContext } from "react";
import SearchBar from "../../components/SearchBar";
import Table from "../table/Table";
import { ActivedButton, AddButton, GreenButton } from "../../components/Button";
import TableFooter from "../table/TableFooter";
import { useState } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { NavBar } from "../../components/NavBar";
import { AppContext } from "../../context/appContext";
import CustomerClass from "../../class/customer";

export default function Customer() {
  const [layout, setLayout] = useState(0);
  const {customers, searchText, setSearchText, host, getCustomers, invoices}= useContext(AppContext);
  const [customer, setCustomer] = useState();
const[page, setPage] = useState(1);

  const OnClickAdd = () => {
    setLayout(1);
 
  };
  const OnClickCancel = ()=>{
    setLayout(0);
  }
  const OnClickEdit = (ele)=>{
    setCustomer(ele);
    setLayout(2);

  }
  const OnClickDelete = (ele)=>{
    setCustomer(ele);
    setLayout(3);
  }
  const handelDelete = ()=>{
    const deleteCustomer= new CustomerClass(customer);
    deleteCustomer.delete(customer._id, host, getCustomers);
    OnClickCancel();

  }

  return (
    <div>
      <div className="min-h-screen h-auto bg-creamy-white">
      
        <NavBar isActive={1} />
        <SearchBar placeholder="Nhập tên khách hàng cần tìm" setSearchText={setSearchText} value={searchText}/>
        <div className="flex justify-end w-full pr-[110px]">
          <AddButton text="Thêm khách hàng" onClick={OnClickAdd} />
        </div>
        <Table title="Danh sách khách hàng" 
        onClickDelete={OnClickDelete}
        onClickEdit={OnClickEdit}
        detailPath={'/khachhang'}
        data= {customers}
        searchText={searchText}
        page={page}
        setPage={page}
        />
        
       
      </div>

      {layout === 1 && <AddCustomer OnClickCancel={OnClickCancel}/> }
      {layout === 2 && <EditCustomer customer={customer} OnClickCancel={OnClickCancel}/> }
      {layout === 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-dark-rust">
              Xác nhận xóa khách hàng?
            </h2>

            <div className="flex justify-between m-2 mt-5">
              <ActivedButton text="Hủy" onClick={OnClickCancel} />
              <GreenButton text="Xác nhận" onClick={handelDelete} />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
