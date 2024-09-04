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

function App() {
  
  return (
    <div className='app-container overflow-hidden '>
     {/* <AppProvider> */}
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
          </Route>
        </Routes>
      
      </BrowserRouter>
    {/* </AppProvider> */}
  </div>
  );
}

export default App;
