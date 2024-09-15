import React, { useEffect, useState } from "react";
import { NavBar, SubNavBar } from "../../../components/NavBar";
import { ActivedButton, GreenButton } from "../../../components/Button";
import AddPurchase from "./AddPurchase";
import BillByItem from '../Bill/BillByItem'
import PickFertilizer from "../Feritlizer/PickFertilizer";


export default function Purchase() {
  const [type, setType] = useState(true);

  const [layout, setLayout] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [detailAmount, setDetailAmount] = useState([]);
  const onClickContinue = async(Type) => {
    if(Type =="phân") {
       setLayout(3);
     
        
    }
    else {
      setType(Type);
      setLayout(2);
    }
  
  };
  const OnClickCancel = () => {
    setLayout(0);
  };
  const onClickMoneyContinue = ()=>{
  setType("tiền");
  setLayout(1);
  }
  useEffect(()=>{
    setDetailAmount([]);
  }, [])
  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={4} />
        <div className="ml-[110px] mr-[110px]">
          <SubNavBar isActive={2} />
          {layout == 0 && (
            <div className="flex flex-col">
              <label className="font-bold text-3xl mb-5 mt-5 ">
                MỜI CHỌN SẢN PHẨM NHẬP KHO:
              </label>
              <div className="flex flex-row justify-between ml-[10%] mr-[10%]">
                <GreenButton text="Cà phê tươi" onClick={() =>onClickContinue("cà tươi")}/>
                <GreenButton text="Cà phê nhân"  onClick={() =>onClickContinue("cà nhân")}/>
                <GreenButton text="Tiêu" onClick={() =>onClickContinue("tiêu")} />
                <GreenButton text="Phân"  onClick={() =>onClickContinue("phân")}/>
                <GreenButton text="Tiền" onClick={onClickMoneyContinue} />
              </div>
              
              

            
            
            </div>
          )}
            {layout == 2 && <BillByItem totalAmount={totalAmount} setTotalAmount={setTotalAmount} onClickFinish= {()=>{setLayout(1)}}  detailAmount={detailAmount} setDetailAmount={setDetailAmount}/>}
              {layout ==1&& <AddPurchase type={type} OnClickCancel={OnClickCancel} totalAmount={totalAmount} detailAmount={detailAmount}/>}
              {layout== 3 && <PickFertilizer setType={setType} onClickCancel={()=> {setLayout(2)}}/>}
        </div>
      </div>
    </div>
  );
}
