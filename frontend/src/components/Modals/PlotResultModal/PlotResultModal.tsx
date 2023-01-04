import React, { FC, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import { useBoardContext } from "../../../context/useBoardContext";
import { useSendGetResultRequest } from "../../../hooks/useSendGetResultRequest";
import { useShouldSendGetResultRequest } from "../../../hooks/useShouldSendGetResultRequest";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType, ResultType } from "../../../types/Node";
import { mapConnectionToIdBased } from "../../../utils/nodes/mapConnectionToIdBased";
import ErrorMessageBar from "../../common/ErrorMessageBar";
import Modal from "../../common/Modal/Modal";
import {
  PlotResultModalBody,
  PlotResultModalImage,
  PlotResultModalInnerBody,
  PlotResultModalLink,
} from "./PlotResultModal.components";

interface PlotResultModalProps {
  onClose: () => void;
  calculationNodeId: string;
  id: string;
}

const PlotResultModal: FC<PlotResultModalProps> = ({
  onClose,
  calculationNodeId,
  id,
}) => {
  const hasResultRequestBeenSent = useRef(false);
  const { nodes, connections } = useBoardContext();

  const { sendGetResultRequest, plotUrl, plotFilename } =
    useSendGetResultRequest();

  const {
    hasCorrectDataUploaded,
    hasDataNodeConnected,
    hasDataUploaded,
    hasCorrectParamsSet,
  } = useShouldSendGetResultRequest(
    nodes,
    connections.map(mapConnectionToIdBased),
    id
  );

  const shouldSendGetResultRequest =
    hasCorrectDataUploaded &&
    hasDataUploaded &&
    hasDataNodeConnected &&
    hasCorrectParamsSet;

  useEffect(() => {
    if (!shouldSendGetResultRequest || hasResultRequestBeenSent.current) return;
    sendGetResultRequest(calculationNodeId, ResultType.Plot);
    hasResultRequestBeenSent.current = true;
  }, []);

  const theme = useTheme();
  const nodeType = NodeType.Result;

  const createErrorMessage = () => {
    if (!hasDataNodeConnected) return "No Data Node has been connected!";
    if (!hasDataUploaded) return "No data has been uploaded!";
    if (!hasCorrectDataUploaded) return "Uploaded data is incorrect!";
    if (!hasCorrectParamsSet) return "Calculation parameters are incorrect!";
    return "";
  };

  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType,
      })}
      onClose={onClose}
      modalHeader={{
        text: "Calculation Result",
        backgroundColor: getNodeBackgroundHoverColor({ theme, nodeType }),
      }}
      dataId="plot-result-modal"
    >
      {!shouldSendGetResultRequest && (
        <ErrorMessageBar message={createErrorMessage()} />
      )}
      {shouldSendGetResultRequest && (
        <PlotResultModalBody>
          <PlotResultModalInnerBody>
            <PlotResultModalImage src={plotUrl} alt="plot" />
            <PlotResultModalLink
              data-id="download-button"
              href={plotUrl}
              download={plotFilename}
            >
              Download
            </PlotResultModalLink>
          </PlotResultModalInnerBody>
        </PlotResultModalBody>
      )}
    </Modal>
  );
};

export default PlotResultModal;
