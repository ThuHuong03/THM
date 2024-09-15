import React, { useContext, useState } from "react";
import { NavBar, SubNavBar } from "../../../components/NavBar";
import { BillDiv, PurchaseInvoiceDiv, SaleInvoiceDiv } from "../../../components/Bill";
import { ActivedButton, GreenButton } from "../../../components/Button";
import { EditBill, EditPurchase, EditSale } from "./EditInvoice";
import InvoicePDF from "../PDF/PrintPdf";
import { AppContext } from "../../../context/appContext";


export default function ManageInvoice() {
  const [type, setType] = useState(true);
  const [layout, setLayout] = useState(0);
  const {invoices} = useContext(AppContext);
  const [invoice, setInvoice]= useState(null);
  const {host, getInvoices} = useContext(AppContext);
  const OnClickCancel = () => {
    setLayout(0);
    setInvoice(null);
  };
  const OnClickDelete = (Invoice) => {
    setLayout(3);
    setInvoice(Invoice)
  };
  const handleDeleteInvoice = ()=>{
    invoice.delete(host, getInvoices);
    setInvoice(null)
    setLayout(0);
  }
  const OnClickEdit = (invoice) => {
  setInvoice(invoice);
    setLayout(2)
  }

  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={4} />
        <div className="ml-[110px] mr-[110px]">
          <SubNavBar isActive={3} />
     
         {
           
            invoices.map((invoice, index)=>{
              
              switch(invoice.title){
              case "Phiếu Xuất": return <BillDiv onClickEdit={OnClickEdit} invoice={invoice} onClickDelete={OnClickDelete} name={true}/>; 
              case "Phiếu Nhập": return <PurchaseInvoiceDiv name={true}  onClickEdit={OnClickEdit} invoice={invoice} onClickDelete={OnClickDelete}/>; 
              case "Phiếu Bán": return <SaleInvoiceDiv name={true} invoice={invoice} onClickEdit={OnClickEdit} onClickDelete={OnClickDelete}/>;  
              default: break;
              }

            })
          }
        
            {
                layout === 2&& invoice.title =="Phiếu Xuất"  &&<EditBill bill={invoice} OnClickCancel={OnClickCancel} />}
              {  layout === 2&& invoice.title =="Phiếu Nhập"  &&<EditPurchase purchaseInvoice={invoice} OnClickCancel={OnClickCancel} />
            }
             {  layout === 2&& invoice.title =="Phiếu Bán"  &&<EditSale saleInvoice={invoice} OnClickCancel={OnClickCancel} />
            }

          {layout === 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg max-h-[80vh]  max-w-[600px] overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-dark-rust">
              Xác nhận xóa Phiếu?
            </h2>

            <div className="flex justify-between m-2 mt-5">
                
              <ActivedButton text="Hủy" onClick={OnClickCancel} />
              <GreenButton text="Xác nhận" onClick={handleDeleteInvoice}/>
              
            </div>
          </div>
        </div>
      )}
          </div>
      </div>
    </div>
  );
}
