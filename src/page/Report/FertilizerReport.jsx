import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import ReportTable from "../table/ReportTable";
import { ToggleButton } from "../../components/Button";
import { AppContext } from "../../context/appContext";
import { NavBar, SubReportNavBar } from "../../components/NavBar";


export default function FertilizerReport() {
  


  const {host, fertilizers} = useContext(AppContext);
  const [topN, setTopN] = useState(5);
  const [Exportdata, setEData] = useState([]);
  const [Importdata, setIData] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  // Hàm sắp xếp khách hàng theo tổng tiền xuất và nhập
  const getTopFertilizers = (fertilizers, topN) => {
    const sortedByExport = [...fertilizers].sort((a, b) => b.totalExportMoney - a.totalExportMoney);
    const sortedByImport = [...fertilizers].sort((a, b) => b.totalImportMoney - a.totalImportMoney);

    // Lấy top N khách hàng cho tiền xuất và tiền nhập
    const topExportFertilizerss = sortedByExport.slice(0, topN);
    const topImportFertilizerss = sortedByImport.slice(0, topN);

    return { topExportFertilizerss, topImportFertilizerss };
  };

  const onChangeSearch = (n) => {
    setTopN(n);
    const { topExportFertilizerss, topImportFertilizerss } = getTopFertilizers(fertilizers, n);
    setIData(topExportFertilizerss);
    setEData(topImportFertilizerss);
  };

  useEffect(() => {
    const { topExportFertilizerss, topImportFertilizerss } = getTopFertilizers(fertilizers, topN);
    setIData(topExportFertilizerss);
    setEData(topImportFertilizerss);
  }, [fertilizers, topN]);

  return (
    <div>
      <div className="h-auto min-h-screen bg-creamy-white">
        <NavBar isActive={5} />
        <div className="ml-[110px] mr-[110px]">
          <SubReportNavBar isActive={4} />
          <SearchBar setSearchText={onChangeSearch} placeholder="Nhập số loại phân muốn hiển thị" />
          <div className="flex items-center justify-center">
          <label className="text-2xl font-bold p-4"> Theo số lượng xuất</label>
          <ToggleButton isToggled={isToggled} setIsToggled={setIsToggled} />
          <label className="text-2xl font-bold p-4">Theo số lượng nhập</label>
          </div>
       
          <ReportTable 
          fertilizer={true}
            data={isToggled ? Importdata : Exportdata} 
            title={isToggled ? `Top ${topN} phân có số lượng Nhập cao nhất` : `Top ${topN} phân có số lượng Xuất cao nhất`} 
            detailPath={'/khachhang'}
          />
       
          </div>
      </div>
    </div>
  );
}
