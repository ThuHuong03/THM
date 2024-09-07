import React, { useState } from "react";
import { NavBar, SubNavBar } from "../../../components/NavBar";
import { ActivedButton, GreenButton } from "../../../components/Button";
import AddBill from "./AddBill";
import BillByItem from "./BillByItem";

export default function Bill() {
  const [type, setType] = useState(true);
  const [layout, setLayout] = useState(0);
  const onClickContinue = () => {
    setLayout(2);
  };
  const OnClickCancel = () => {
    setLayout(0);
  };
  
  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={4} />
        <div className="ml-[110px] mr-[110px]">
          <SubNavBar isActive={1} />
          {layout == 0 && (
            <div className="flex flex-col">
              <label className="font-bold text-3xl mb-5 mt-5 ">
                MỜI CHỌN SẢN PHẨM XUẤT KHO:
              </label>
              <div className="flex flex-row justify-between ml-[10%] mr-[10%]">
                <GreenButton text="Cà phê tươi" onClick={onClickContinue}/>
                <GreenButton text="Cà phê nhân"  onClick={onClickContinue}/>
                <GreenButton text="Tiêu" onClick={onClickContinue} />
                <GreenButton text="Phân"  onClick={onClickContinue}/>
                <GreenButton text="Tiền" onClick={()=>setLayout(1)} />
              </div>
              
              

            
            
            </div>
          )}
            {layout == 2 && <BillByItem />}
              {layout ==1&& <AddBill OnClickCancel={OnClickCancel}/>}
        </div>
      </div>
    </div>
  );
}
