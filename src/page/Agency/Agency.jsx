import React, { useContext, useState } from "react";
import { NavBar } from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import Table from "../table/Table";
import { ActivedButton, AddButton, GreenButton } from "../../components/Button";
import TableFooter from "../table/TableFooter";
import AddAgency from "./AddAgency";
import EditAgency from "./EditAgency";
import { AppContext } from "../../context/appContext";
import AgencyClass from "../../class/agency";
export default function Agency() {
  const [layout, setLayout] = useState(0);
  const {agencies, searchText, setSearchText, host, getAgencies} = useContext(AppContext);
  const [agency, setAgency] = useState();
  const OnClickAdd = () => {
    setLayout(1);
  };
  const OnClickCancel = () => {
    setLayout(0);
  };
  const OnClickEdit = (ele) => {
    setAgency(ele);
    setLayout(2);
  };
  const OnClickDelete = (ele) => {
  setAgency(ele);
    setLayout(3);
  };

  const handelDelete = ()=>{
    const deleteProvider= new AgencyClass(agency);
    deleteProvider.delete( host, getAgencies);
    OnClickCancel();

  }
  return (
    <div className="min-h-screen h-auto bg-creamy-white">
      <NavBar isActive={2} />
      <SearchBar placeholder="Nhập tên đại lý cần tìm" setSearchText={setSearchText} value={searchText}/>
      <div className="flex justify-end w-full pr-[110px]">
        <AddButton text="Thêm đại lý" onClick={OnClickAdd} />
      </div>
      <Table
        title="Danh sách đại lý"
        onClickDelete={OnClickDelete }
        onClickEdit={OnClickEdit}
        detailPath='/daily'
        data={agencies}
        searchText={searchText}
      />
  
      {layout === 1 && <AddAgency OnClickCancel={OnClickCancel} />}
      {layout === 2 && <EditAgency agency={agency} OnClickCancel={OnClickCancel} />}
      {layout === 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-dark-rust">
              Xác nhận xóa đại lý?
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
