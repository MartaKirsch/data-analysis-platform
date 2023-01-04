import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "styled-components";
import { useBoardContext } from "../../../context/useBoardContext";
import { useReadFile } from "../../../hooks/useReadFile";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { LinearRegressionParameters, NodeType } from "../../../types/Node";
import { TableRow } from "../../../types/TableRow";
import {
  ClassParameterModalBody,
  ClassParameterModalInnerBody,
} from "../../common/ClassParameterModal/ClassParameterModal.components";
import ErrorMessageBar from "../../common/ErrorMessageBar";
import Modal from "../../common/Modal/Modal";
import { Label, Select, Option } from "../../common/Select/Select";
import * as XLSX from "xlsx";
import { LinearRegressionModalSelectWrapper } from "./LinearRegressionModal.components";

type FormData = {
  Indexes: number[];
};

interface LinearRegressionModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: LinearRegressionParameters;
}

const LinearRegressionModal: FC<LinearRegressionModalProps> = ({
  file,
  id,
  onClose,
  parameters,
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
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { Indexes: parameters?.Indexes },
  });

  watch((data) => {
    const indexes = (data.Indexes as number[]) || [];
    setNodeCalculationParameters(id, {
      Indexes: [...indexes],
    });
  });

  const maxColsToSelect = 2;

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
          {new Array(maxColsToSelect).fill("").map((_, selectIndex) => (
            <LinearRegressionModalSelectWrapper>
              <Label>Column {selectIndex + 1}</Label>
              <Controller
                name={`Indexes.${selectIndex}`}
                control={control}
                rules={{
                  required: { value: true, message: "This field is required!" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={(ev) => {
                      !!ev.target.value
                        ? onChange(parseInt(ev.target.value))
                        : onChange(undefined);
                    }}
                  >
                    <Option key="default-option" value={undefined}></Option>
                    {getColumnNames().map((c, i) => (
                      <Option value={i} key={`${c}-${i}`}>
                        {c}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </LinearRegressionModalSelectWrapper>
          ))}
          {errors.Indexes && (
            <ErrorMessageBar message={errors.Indexes.message || ""} size="xs" />
          )}
        </ClassParameterModalInnerBody>
      </ClassParameterModalBody>
    </Modal>
  );
};

export default LinearRegressionModal;
