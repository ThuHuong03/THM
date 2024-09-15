import React, { useContext, useEffect, useState } from "react";
import { NavBar, SubReportNavBar } from "../../components/NavBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LabelList  } from 'recharts';
import { AppContext } from "../../context/appContext";
import getCurrentDate from "../../mathFormula/getCurrentDay";

export default function MoneyReport() {
  const { host, getInvoices, invoices } = useContext(AppContext);

  const [dataByDate, setDataByDate] = useState([]);
  const [dataByMonth, setDataByMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());  // State cho ngày nhập
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State cho năm hiện tại

  useEffect(() => {
    async function fetchInvoices() {
      const filteredInvoices = invoices.filter(invoice => invoice.type === "tiền");



      // Dữ liệu theo ngày nhập
      const groupedByDate = groupByDate(filteredInvoices, selectedDate);
      setDataByDate(groupedByDate);

      // Dữ liệu theo 12 tháng của năm hiện tại
      const groupedByMonth = groupByMonth(filteredInvoices, selectedYear);
      setDataByMonth(groupedByMonth);
    }

    fetchInvoices();
  }, [invoices, selectedDate, selectedYear]);


  // Hàm để nhóm dữ liệu theo ngày nhập (dd/MM/yyyy)
  const groupByDate = (invoices, selectedDate) => {
    return invoices.reduce((acc, invoice) => {
      const invoiceDate = invoice.date; // Chuyển về định dạng dd/MM/yyyy

      if (!selectedDate || invoiceDate === selectedDate) {
        if (!acc[invoiceDate]) {
          acc[invoiceDate] = { date: invoiceDate, xuat: 0, nhap: 0 };
        }
        acc[invoiceDate][invoice.title === 'Phiếu Xuất' ? 'xuat' : 'nhap'] += invoice.totalAmount;
      }
      const reversedEntries = Object.entries(acc).reverse();
      const newAcc = Object.fromEntries(reversedEntries);
      return newAcc;
    }, {});
  };

  // Hàm để nhóm dữ liệu theo tháng trong năm hiện tại
  const groupByMonth = (invoices, year) => {
    return invoices.reduce((acc, invoice) => {
        const invoiceDate = invoice.date
        const [day, month, invoiceYear] = invoice.date.split('/').map(Number);
      
  
        if (invoiceYear === year) {
          if (!acc[month]) {
            acc[month] = { month: `Tháng ${month}`, xuat: 0, nhap: 0 };
          }
        acc[month][invoice.title === 'Phiếu Xuất' ? 'xuat' : 'nhap'] += invoice.totalAmount;
      }

      return acc;
    }, {});
  };

  // Hàm chuyển đổi ngày thành định dạng dd/MM/yyyy
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Chuyển đổi từ yyyy-MM-dd của input[type="date"] thành dd/MM/yyyy
  const handleDateChange = (e) => {
   
    setSelectedDate(e.target.value); // Lưu dưới dạng dd/MM/yyyy
  };

  const formatNumber = (value) => {
    return value.toLocaleString('vi-VN'); // Định dạng số với dấu phân cách hàng nghìn
  };
  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={5} />
        <div className="ml-[110px] mr-[110px]">
          <SubReportNavBar isActive={5} />

         

          {/* Biểu đồ theo ngày nhập */}
          <h2 className="text-3xl font-bold uppercase align-center">Biểu đồ ngày: </h2>
          <input
        
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 my-2 rounded-lg text-2xl border-black  font-semibold"
          />
          <ResponsiveContainer width="95%" height={600}>
            <BarChart data={Object.values(dataByDate)}  margin={{ left: 40, bottom:10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis  className="text-lg font-medium"  tickFormatter={formatNumber} />
              <Tooltip  formatter={(value) => formatNumber(value) + ' VND'}
               />
              <Legend />
              <Bar dataKey="xuat" fill="#5A2727" name="Phiếu Xuất" />
              <Bar dataKey="nhap" fill="#4C5F3B" name="Phiếu Nhập" />
            </BarChart>
          </ResponsiveContainer>

          {/* Biểu đồ 12 tháng trong năm */}
         <label className="text-3xl font-bold uppercase align-center items-center">Biểu đồ năm: </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border p-2 my-2 rounded-lg text-2xl border-black font-semibold"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart data={Object.values(dataByMonth)} margin={{ left: 40, bottom:10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis className="text-lg font-medium"   tickFormatter={formatNumber}/>
              <Tooltip  formatter={(value) => formatNumber(value) + ' VND'} />
              <Legend />
              <Bar dataKey="xuat" fill="#5A2727" name="Phiếu Xuất"/>
               
            
              <Bar dataKey="nhap" fill="#4C5F3B" name="Phiếu Nhập" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
