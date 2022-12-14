import React, { FC } from "react";
import { useTheme } from "styled-components";
import { useBoardContext } from "../../../context/useBoardContext";
import { useReadFile } from "../../../hooks/useReadFile";
import { useSendGetResultRequest } from "../../../hooks/useSendGetResultRequest";
import { useShouldSendGetResultRequest } from "../../../hooks/useShouldSendGetResultRequest";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType } from "../../../types/Node";
import { mapConnectionToIdBased } from "../../../utils/nodes/mapConnectionToIdBased";
import ErrorMessageBar from "../../common/ErrorMessageBar";
import * as XLSX from "xlsx";
import Modal from "../../common/Modal/Modal";
import {
  PredictionResultModalBody,
  PredictionResultModalButton,
  PredictionResultModalInnerBody,
  PredictionResultModalInput,
  PredictionResultModalRow,
} from "./PredictionResultModal.components";
import { TableRow } from "../../../types/TableRow";
import { useFieldArray, useForm } from "react-hook-form";
import { useDeepCompareEffect } from "use-deep-compare";
import { Label } from "../../common/Select/Select";

interface PredictionResultModalProps {
  onClose: () => void;
  calculationNodeId: string;
  id: string;
}

type FormData = { values: unknown[] };

const PredictionResultModal: FC<PredictionResultModalProps> = ({
  onClose,
  calculationNodeId,
  id,
}) => {
  //   const hasResultRequestBeenSent = useRef(false);
  const { nodes, connections } = useBoardContext();

  const { sendGetResultRequest } = useSendGetResultRequest();

  const {
    hasCorrectDataUploaded,
    hasDataNodeConnected,
    hasDataUploaded,
    hasCorrectParamsSet,
    connectedDataNode,
  } = useShouldSendGetResultRequest(
    nodes,
    connections.map(mapConnectionToIdBased),
    id
  );

  const { workbook, selectedWorksheetName } = useReadFile(
    connectedDataNode?.data as File
  );
  const getTableRows = (): TableRow[] => {
    const sheetData = workbook?.Sheets[selectedWorksheetName] || [];
    return XLSX.utils.sheet_to_json(sheetData);
  };
  const getColumnNames = () => {
    const tableRows = getTableRows();
    return Object.keys(tableRows[0] || {});
  };
  const columnNames = getColumnNames();

  const shouldSendGetResultRequest =
    hasCorrectDataUploaded &&
    hasDataUploaded &&
    hasDataNodeConnected &&
    hasCorrectParamsSet;

  //   useEffect(() => {
  //     if (!shouldSendGetResultRequest || hasResultRequestBeenSent.current) return;
  //     sendGetResultRequest(calculationNodeId, ResultType.Prediction);
  //     hasResultRequestBeenSent.current = true;
  //   }, []);

  const theme = useTheme();
  const nodeType = NodeType.Result;

  const createErrorMessage = () => {
    if (!hasDataNodeConnected) return "No Data Node has been connected!";
    if (!hasDataUploaded) return "No data has been uploaded!";
    if (!hasCorrectDataUploaded) return "Uploaded data is incorrect!";
    if (!hasCorrectParamsSet) return "Calculation parameters are incorrect!";
    return "";
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { values: [] },
  });
  const { fields } = useFieldArray({
    control,
    name: "values",
  });

  useDeepCompareEffect(() => {
    setValue(
      "values",
      columnNames.map(() => "")
    );
  }, [columnNames]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType,
      })}
      onClose={onClose}
      modalHeader={{
        text: "Calculation Result - Prediction",
        backgroundColor: getNodeBackgroundHoverColor({ theme, nodeType }),
      }}
    >
      {!shouldSendGetResultRequest && (
        <ErrorMessageBar message={createErrorMessage()} />
      )}
      {shouldSendGetResultRequest && (
        <PredictionResultModalBody>
          <PredictionResultModalInnerBody>
            {fields.map((_item, index) => {
              return (
                <PredictionResultModalRow key={`prediction-input-${index}`}>
                  <Label>{columnNames[index]}</Label>
                  <PredictionResultModalInput
                    {...register(`values.${index}`, { required: true })}
                  />
                </PredictionResultModalRow>
              );
            })}
            <PredictionResultModalButton
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Predict
            </PredictionResultModalButton>
          </PredictionResultModalInnerBody>
        </PredictionResultModalBody>
      )}
    </Modal>
  );
};

export default PredictionResultModal;
