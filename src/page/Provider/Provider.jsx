import React, { useContext, useState } from "react";
import { NavBar } from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import Table from "../table/Table";
import { ActivedButton, AddButton, GreenButton } from "../../components/Button";
import TableFooter from "../table/TableFooter";
import AddProvider from "./AddProvider";
import EditProvider from "./EditProvider";
import { AppContext } from "../../context/appContext";
import ProviderClass from '../../class/provider';
export default function Provider() {
  const [layout, setLayout] = useState(0);
  const {providers, searchText, setSearchText, host, getProviders} = useContext(AppContext);
  const [provider, setProvider] = useState();
  const OnClickAdd = () => {
    setLayout(1);
  };
  const OnClickCancel = () => {
    setLayout(0);
  };
  const OnClickEdit = (ele) => {
    setProvider(ele);
    setLayout(2);
  };
  const OnClickDelete = (ele) => {
  setProvider(ele);
    setLayout(3);
  };

  const handelDelete = ()=>{
    const deleteProvider= new ProviderClass(provider);
    deleteProvider.delete( host, getProviders);
    OnClickCancel();

  }
  return (
    <div className="min-h-screen h-auto  bg-creamy-white">
      <NavBar isActive={3} />
      <SearchBar placeholder="Nhập tên nhà cung cấp cần tìm" setSearchText={setSearchText} value={searchText}/>
      <div className="flex justify-end w-full pr-[110px]">
        <AddButton text="Thêm nhà cung cấp" onClick={OnClickAdd} />
      </div>
      <Table title="Danh sách nhà cung cấp"
      onClickDelete={OnClickDelete}
      onClickEdit={OnClickEdit}
      detailPath='/nhacungcap'
      data={providers}
      searchText={searchText}
      />
  
      {layout === 1 && <AddProvider OnClickCancel={OnClickCancel}  />}
      {layout === 2 && <EditProvider OnClickCancel={OnClickCancel} provider={provider} />}
      {layout === 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-dark-rust">
              Xác nhận xóa nhà cung cấp?
            </h2>

            <div className="flex justify-between m-2 mt-5">
              <ActivedButton text="Hủy" onClick={OnClickCancel} />
              <GreenButton text="Xác nhận" onClick={handelDelete}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
