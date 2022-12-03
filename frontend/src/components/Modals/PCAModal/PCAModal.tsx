import React, { FC } from "react";
import { useTheme } from "styled-components";
import { useReadFile } from "../../../hooks/useReadFile";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType, PCAparameters } from "../../../types/Node";
import { TableRow } from "../../../types/TableRow";
import Modal from "../../common/Modal/Modal";
import {
  PCAModalBody,
  PCAModalInnerBody,
  PCAModalSelectWrapper,
} from "./PCAModal.components";
import * as XLSX from "xlsx";
import { Select, Option, Label } from "../../common/Select/Select";
import { useForm } from "react-hook-form";
import ErrorMessageBar from "../../common/ErrorMessageBar";
import { useBoardContext } from "../../../context/useBoardContext";

interface PCAModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: PCAparameters;
}

type PCAformData = { Column: string };

const PCAModal: FC<PCAModalProps> = ({ onClose, file, parameters, id }) => {
  const { setNodeCalculationParameters } = useBoardContext();

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

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<PCAformData>({
    mode: "onChange",
    defaultValues: parameters,
  });

  watch((data) => {
    setNodeCalculationParameters(id, { Column: data.Column! });
  });

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
        <PCAModalInnerBody>
          <PCAModalSelectWrapper>
            <Label>Column</Label>
            <Select
              {...register("Column", {
                required: { value: true, message: "This field is required!" },
              })}
            >
              <Option key="default-option" value={undefined}></Option>
              {getColumnNames().map((c, i) => (
                <Option value={c} key={`${c}-${i}`}>
                  {c}
                </Option>
              ))}
            </Select>
          </PCAModalSelectWrapper>
          {errors.Column && (
            <ErrorMessageBar message={errors.Column.message || ""} size="xs" />
          )}
        </PCAModalInnerBody>
      </PCAModalBody>
    </Modal>
  );
};

export default PCAModal;
