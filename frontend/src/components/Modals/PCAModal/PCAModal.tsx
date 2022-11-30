import React, { FC } from "react";
import { useTheme } from "styled-components";
import { useReadFile } from "../../../hooks/useReadFile";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType } from "../../../types/Node";
import { TableRow } from "../../../types/TableRow";
import Modal from "../../common/Modal/Modal";
import { PCAModalBody, PCAModalInnerBody } from "./PCAModal.components";
import * as XLSX from "xlsx";

interface PCAModalProps {
  onClose: () => void;
  id: string;
  file?: File;
}

const PCAModal: FC<PCAModalProps> = ({ onClose, file }) => {
  const theme = useTheme();
  const nodeType = NodeType.Calculation;

  const { workbook, selectedWorksheetName } = useReadFile(file);

  const getTableRows = (): TableRow[] => {
    const sheetData = workbook?.Sheets[selectedWorksheetName] || [];
    return XLSX.utils.sheet_to_json(sheetData);
  };

  const getColumnNames = () => {
    const tableRows = getTableRows();
    return Object.keys(tableRows[0] || {});
  };

  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType,
      })}
      onClose={onClose}
      modalHeader={{
        text: "Calculation Parameters",
        backgroundColor: getNodeBackgroundHoverColor({ theme, nodeType }),
      }}
    >
      <PCAModalBody>
        <PCAModalInnerBody>{getColumnNames().join(", ")}</PCAModalInnerBody>
      </PCAModalBody>
    </Modal>
  );
};

export default PCAModal;
