import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export const useReadFile = (file?: File) => {
  const [workbook, setWorkbook] = useState<XLSX.WorkBook>();
  const [selectedWorksheetName, setSelectedWorksheetName] = useState("");

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "binary" });
      setWorkbook(workbook);
      setSelectedWorksheetName(workbook.SheetNames[0]);
    };
    return () => reader.abort();
  }, [file]);

  return { workbook, selectedWorksheetName, setSelectedWorksheetName };
};
