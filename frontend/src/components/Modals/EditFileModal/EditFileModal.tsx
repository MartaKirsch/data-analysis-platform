import React, { FC, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodeType } from "../../../types/Node";
import Modal from "../../common/Modal/Modal";
import * as XLSX from "xlsx";
import {
  SheetNameButton,
  SheetNameButtonsWrapper,
} from "./EditFileModal.components";

interface EditFileModalProps extends ComponentWithChildren {
  onClose: () => void;
  file: File;
}

const EditFileModal: FC<EditFileModalProps> = ({ onClose, file }) => {
  const nodeType = NodeType.Data;
  const theme = useTheme();

  const [workbook, setWorkbook] = useState<XLSX.WorkBook>();
  const [selectedWorksheetName, setSelectedWorksheetName] = useState("");

  useEffect(() => {
    console.log(file);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const workbook = XLSX.read(reader.result, { type: "binary" });
      setWorkbook(workbook);
      setSelectedWorksheetName(workbook.SheetNames[0]);

      // save to File
      // const a: ArrayBuffer = XLSX.write(workbook, { type: "array" });
      // let blob1 = new Blob([a], { type: file.type });
      // console.log(new File([blob1], file.name, { type: file.type }));
      // console.log(file);

      // get worksheet data
      //   const worksheet = workbook.Sheets["Sheet1"];
      //   const data = XLSX.utils.sheet_to_json<ExcelData[]>(worksheet);
    };
    return () => reader.abort();
  }, [file]);

  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType,
      })}
      onClose={onClose}
      modalHeader={{
        text: "Edit uploaded file",
        backgroundColor: getNodeBackgroundHoverColor({ theme, nodeType }),
      }}
    >
      <SheetNameButtonsWrapper>
        {workbook?.SheetNames.map((sheetName, index) => (
          <SheetNameButton
            isActive={sheetName === selectedWorksheetName}
            onClick={() => setSelectedWorksheetName(sheetName)}
            key={`${sheetName}-${index.toString()}`}
          >
            {sheetName}
          </SheetNameButton>
        ))}
      </SheetNameButtonsWrapper>
    </Modal>
  );
};

export default EditFileModal;
