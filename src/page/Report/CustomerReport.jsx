import React, { useContext, useEffect, useState } from "react";
import { NavBar, SubReportNavBar } from "../../components/NavBar";
import { AppContext } from "../../context/appContext";
import ReportTable from "../table/ReportTable";
import { ToggleButton } from "../../components/Button";
import SearchBar from "../../components/SearchBar";

export default function CustomerReport() {
  const { customers } = useContext(AppContext);
  const [topN, setTopN] = useState(5);
  const [Exportdata, setEData] = useState([]);
  const [Importdata, setIData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  // Hàm sắp xếp khách hàng theo tổng tiền xuất và nhập
  const getTopCustomers = (customers, topN) => {
    const sortedByExport = [...customers].sort((a, b) => b.totalExportMoney - a.totalExportMoney);
    const sortedByImport = [...customers].sort((a, b) => b.totalImportMoney - a.totalImportMoney);

    // Lấy top N khách hàng cho tiền xuất và tiền nhập
    const topExportCustomers = sortedByExport.slice(0, topN);
    const topImportCustomers = sortedByImport.slice(0, topN);

    return { topExportCustomers, topImportCustomers };
  };

  const onChangeSearch = (n) => {
    setTopN(n);
    const { topImportCustomers, topExportCustomers } = getTopCustomers(customers, n);
    setIData(topImportCustomers);
    setEData(topExportCustomers);
  };

  useEffect(() => {
    const { topImportCustomers, topExportCustomers } = getTopCustomers(customers, topN);
    setIData(topImportCustomers);
    setEData(topExportCustomers);
  }, [customers, topN]);

  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={5} />
        <div className="ml-[110px] mr-[110px]">
          <SubReportNavBar isActive={1} />
          <SearchBar setSearchText={onChangeSearch} placeholder="Nhập số người muốn hiển thị" />
          <div className="flex items-center justify-center">
          <label className="text-2xl font-bold p-4"> Theo số tiền xuất</label>
          <ToggleButton isToggled={isToggled} setIsToggled={setIsToggled} />
          <label className="text-2xl font-bold p-4">Theo số tiền nhập</label>
          </div>
       
          <ReportTable 
            data={isToggled ? Importdata : Exportdata} 
            title={isToggled ? `Top ${topN} người có số tiền Nhập cao nhất` : `Top ${topN} người có số tiền Xuất cao nhất`} 
            detailPath={'/khachhang'}
          />
        </div>
      </div>
    </div>
  );
}
