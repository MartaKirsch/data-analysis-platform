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
  NaiveBayesModalBody,
  NaiveBayesModalInnerBody,
  NaiveBayesModalSelectWrapper,
} from "./NaiveBayesModal.components";
import * as XLSX from "xlsx";
import { Select, Option, Label } from "../../common/Select/Select";
import { Controller, useForm } from "react-hook-form";
import ErrorMessageBar from "../../common/ErrorMessageBar";
import { useBoardContext } from "../../../context/useBoardContext";

interface NaiveBayesModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: PCAparameters;
}

type PCAformData = { Column: string };

const NaiveBayesModal: FC<NaiveBayesModalProps> = ({
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
  } = useForm<PCAformData>({
    mode: "onChange",
    defaultValues: { Column: parameters?.Column },
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
      <NaiveBayesModalBody>
        <NaiveBayesModalInnerBody>
          <NaiveBayesModalSelectWrapper>
            <Label>Column</Label>
            <Controller
              name="Column"
              control={control}
              rules={{
                required: { value: true, message: "This field is required!" },
              }}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <Option key="default-option" value={undefined}></Option>
                  {getColumnNames().map((c, i) => (
                    <Option value={c} key={`${c}-${i}`}>
                      {c}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </NaiveBayesModalSelectWrapper>
          {errors.Column && (
            <ErrorMessageBar message={errors.Column.message || ""} size="xs" />
          )}
        </NaiveBayesModalInnerBody>
      </NaiveBayesModalBody>
    </Modal>
  );
};

export default NaiveBayesModal;
