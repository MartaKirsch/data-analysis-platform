import React, { FC } from "react";
import { useTheme } from "styled-components";
import { useReadFile } from "../../../hooks/useReadFile";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType, ClassParameters } from "../../../types/Node";
import { TableRow } from "../../../types/TableRow";
import Modal from "../../common/Modal/Modal";
import {
  ClassParameterModalBody,
  ClassParameterModalInnerBody,
  ClassParameterModalSelectWrapper,
} from "./ClassParameterModal.components";
import * as XLSX from "xlsx";
import { Select, Option, Label } from "../../common/Select/Select";
import { Controller, useForm } from "react-hook-form";
import ErrorMessageBar from "../../common/ErrorMessageBar";
import { useBoardContext } from "../../../context/useBoardContext";

interface ClassParameterModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: ClassParameters;
}

type ClassFormData = { Class: string };

const ClassParameterModal: FC<ClassParameterModalProps> = ({
  onClose,
  file,
  parameters,
  id,
}) => {
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
    control,
    formState: { errors },
    watch,
  } = useForm<ClassFormData>({
    mode: "onChange",
    defaultValues: { Class: parameters?.Class },
  });

  watch((data) => {
    setNodeCalculationParameters(id, { Class: data.Class! });
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
      <ClassParameterModalBody>
        <ClassParameterModalInnerBody>
          <ClassParameterModalSelectWrapper>
            <Label>Class</Label>
            <Controller
              name="Class"
              control={control}
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              render={({ field: { value, onChange } }) => (
                <Select
                  data-id="class-select"
                  value={value}
                  onChange={onChange}
                >
                  <Option key="default-option" value={undefined}></Option>
                  {getColumnNames().map((c, i) => (
                    <Option value={c} key={`${c}-${i}`}>
                      {c}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </ClassParameterModalSelectWrapper>
          {errors.Class && (
            <ErrorMessageBar message={errors.Class.message || ""} size="xs" />
          )}
        </ClassParameterModalInnerBody>
      </ClassParameterModalBody>
    </Modal>
  );
};

export default ClassParameterModal;
