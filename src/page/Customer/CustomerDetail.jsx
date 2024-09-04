import React from "react";
import { NavBar } from "../../components/NavBar";
import SearchBar from "../../components/SearchBar";
import { FaUserCircle } from "react-icons/fa";
import TextCmp from "../../components/TextCmp";
import {Bill,  PurchaseInvoice } from "../../components/Bill";
export default function CustomerDetail() {
  const OnClickButton = () => {
    console.log("OnClickButton");
  };
  return (
    <div>
      <div className="h-screen bg-creamy-white">
        <NavBar isActive={1} />
        <SearchBar placeholder="Nhập ngày cần tìm" />
        <div className="ml-[110px] mr-[110px]">
          <div className="flex flex-row justify-between items-center">
            <FaUserCircle color="#672F2F" size={130} />
            <label> Khách hàng
            </label>
            <div className="grid grid-cols-2 grid-flow-row gap-10 gap-y-5 w-[70%]">
              <TextCmp title="Họ tên:" text="Nguyễn Thị Thu Hương" />
              <TextCmp title="Tổng cà tươi" text="122333" OnClickButton={OnClickButton} />

              <TextCmp title="Địa chỉ:" text="122333" />
              <TextCmp title="Tổng cà nhân" text="122333" OnClickButton={OnClickButton} />
              <TextCmp title="Tài khoản ngân hàng" text="122333" />
              <TextCmp title="Tổng tiêu" text="122333"  OnClickButton={OnClickButton}/>
              <TextCmp title="Số điện thoại" text="122333" />
              <TextCmp title="Tổng tiền gửi" text="122333"  />
              <TextCmp title="Ghi chú" text="122333" />
              <TextCmp title="Tổng tiền nợ" text="19u39223" />
            </div>
          </div>

          <div>
            <Bill/>
            <PurchaseInvoice/>
          </div>
        </div>
      </div>
    </div>
  );
}
