import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Invoice from "../class/invoice";
import { Bill } from "../class/bill";
import { PurchaseInvoice } from "../class/purchaseInvoice";
import { SaleInvoice } from "../class/saleInvoice";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [searchText, setSearchText] = useState('');
  const host = 'http://localhost:8080';

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${host}/customers`);
      setCustomers(response.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err);
    }
  };

  const getAgencies = async () => {
    try {
      const response = await axios.get(`${host}/agencies`);
      setAgencies(response.data);
    } catch (err) {
      console.error('Error fetching agencies:', err);
      setError(err);
    }
  };

  const getProviders = async () => {
    try {
      const response = await axios.get(`${host}/providers`);
      setProviders(response.data);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError(err);
    }
  };
  const getFertilizers = async () => {
    try {
      const response = await axios.get(`${host}/fertilizers`);
      setFertilizers(response.data);
    } catch (err) {
      console.error('Error fetching providers:', err);
      setError(err);
    }
  };
  const getInvoices = async () => {
    
     
      axios.get(`${host}/invoices`)
      .then((response) => {
      

        const newInvoices = response.data;
      
   if (newInvoices) {
        const invoicesToAdd = newInvoices.map((invoice) => {
         
          switch (invoice.title) {
            case "Phiếu Xuất":
              return new Bill({ invoiceData: invoice, exportPrice: invoice.exportPrice });
            case "Phiếu Nhập":
        return new PurchaseInvoice({ invoiceData: invoice, importPrice: invoice.salePrice });
            case "Phiếu Bán":
              return new SaleInvoice({ invoiceData: invoice, salePrice: invoice.salePrice });
            default:
              return null; 
          }
        }).filter(invoice => invoice !== null);  

       
        setInvoices(invoicesToAdd);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  
  };

  const getInventory = async () => {
    try {
      const response = await axios.get(`${host}/inventory`);
      setInventory(response.data);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAgencies(),
        getCustomers(),
        getProviders(),
        getInvoices(),
        getInventory(),
        getFertilizers()
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{
      host,
      customers, setCustomers,
      agencies, setAgencies,
      providers, setProviders,
      invoices, setInvoices,
      inventory, setInventory,
      fertilizers, setFertilizers, getFertilizers,
      loading, error,
      getCustomers, getAgencies, getProviders, getInvoices, getInventory,
      searchText, setSearchText
    }}>
      {children}
    </AppContext.Provider>
  );
};
