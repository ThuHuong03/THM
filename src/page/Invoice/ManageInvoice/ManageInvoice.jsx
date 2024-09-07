import React, { useState } from "react";
import { NavBar, SubNavBar } from "../../../components/NavBar";
import { Bill, PurchaseInvoice } from "../../../components/Bill";
import { ActivedButton, GreenButton } from "../../../components/Button";
import EditInvoice from "./EditInvoice";
import InvoicePDF from "../PDF/PrintPdf";


export default function ManageInvoice() {
  const [type, setType] = useState(true);
  const [layout, setLayout] = useState(0);
  const OnClickCancel = () => {
    setLayout(0);
  };
  const OnClickDelete = () => {
    setLayout(3);
  };
  const OnclickEdit = () => {
    setLayout(2)
  }
  
  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={4} />
        <div className="ml-[110px] mr-[110px]">
          <SubNavBar isActive={3} />
     
          <Bill name={true} onClickDelete={OnClickDelete} onClickEdit={OnclickEdit}/>
          <PurchaseInvoice name={true}/>
            {
                layout === 2&& <EditInvoice OnClickCancel={OnClickCancel}/>
            }

          {layout === 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-dark-rust">
              Xác nhận xóa Phiếu?
            </h2>

            <div className="flex justify-between m-2 mt-5">
                
              <ActivedButton text="Hủy" onClick={OnClickCancel} />
              <GreenButton text="Xác nhận" />
              
            </div>
          </div>
        </div>
      )}
          </div>
      </div>
    </div>
  );
}
