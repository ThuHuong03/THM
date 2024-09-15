import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Customer from './page/Customer/Customer';
import Agency from './page/Agency/Agency';
import Provider from './page/Provider/Provider';
import CustomerDetail from './page/Customer/CustomerDetail';
import ProviderDetail from './page/Provider/ProviderDetail';
import AgencyDetail from './page/Agency/AgencyDetail';
import Bill from './page/Invoice/Bill/Bill';
import Purchase from './page/Invoice/Purchase.jsx/Purchase';
import ManageInvoice from './page/Invoice/ManageInvoice/ManageInvoice';
import { AppProvider } from './context/appContext';
import CustomerReport from './page/Report/CustomerReport';
import CFReport from './page/Report/CFReport';
import PepperReport from './page/Report/PepperReport';
import FertilizerReport from './page/Report/FertilizerReport';
import MoneyReport from './page/Report/MoneyReport';
function App() {
  
  return (
    <div className='app-container overflow-hidden '>
     <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/khachhang' element={<Customer/>} />
            <Route path='/khachhang/:id' element={<CustomerDetail/>} />
            <Route path='/' element={<Customer/>} />
            <Route path='/daily' element={<Agency/>} />
            <Route path='/daily/:id' element={<AgencyDetail/>} />
            <Route path='/nhacungcap' element={<Provider/>} />
            <Route path='/nhacungcap/:id' element={<ProviderDetail/>} />
            <Route path='/kho/xuatkho' element={<Bill/>} /> 
             <Route path='/kho/nhapkho' element={<Purchase/>} />
             <Route path='/kho/quanlyphieu' element={<ManageInvoice/>} />
             <Route path='/baocao/khachhang' element={<CustomerReport/>} />
             <Route path='/baocao/caphe' element={<CFReport/>} />
             <Route path='/baocao/tieu' element={<PepperReport/>} />
             <Route path='/baocao/phan' element={<FertilizerReport/>} />
             <Route path='/baocao/tien' element={<MoneyReport/>} />
          </Route>
        </Routes>
      
      </BrowserRouter>
    </AppProvider>
  </div>
  );
}

export default App;
