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
import ExcelEditableTable from "./ExcelEditableTable";

interface EditFileModalProps extends ComponentWithChildren {
  onClose: () => void;
  file: File;
  nodeType: NodeType;
  headerText: string;
}

const EditFileModal: FC<EditFileModalProps> = ({
  onClose,
  file,
  nodeType,
  headerText,
}) => {
  const theme = useTheme();

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

  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType,
      })}
      onClose={onClose}
      modalHeader={{
        text: headerText,
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
      {!workbook && "We are loading your file, please wait. "}
      {workbook?.Sheets[selectedWorksheetName] && (
        <ExcelEditableTable
          worksheet={workbook.Sheets[selectedWorksheetName]}
        />
      )}
    </Modal>
  );
};

export default EditFileModal;
