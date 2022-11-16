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
import Modal from "../../common/Modal/Modal";
import {
  PlotResultModalBody,
  PlotResultModalImage,
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

  const { sendGetPlotRequest, plotUrl, plotFilename } =
    useSendGetResultRequest();

  const { shouldSendGetResultRequest } = useShouldSendGetResultRequest(
    nodes,
    connections.map(mapConnectionToIdBased),
    id
  );

  useEffect(() => {
    if (!shouldSendGetResultRequest || hasResultRequestBeenSent.current) return;
    sendGetPlotRequest(calculationNodeId, ResultType.Plot);
    hasResultRequestBeenSent.current = true;
  }, []);

  const theme = useTheme();
  const nodeType = NodeType.Result;

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
    >
      {!shouldSendGetResultRequest && (
        <>No Data Node has been connected or it has no data provided!</>
      )}
      {shouldSendGetResultRequest && (
        <PlotResultModalBody>
          <PlotResultModalImage src={plotUrl} alt="plot" />
          <PlotResultModalLink href={plotUrl} download={plotFilename}>
            Download
          </PlotResultModalLink>
        </PlotResultModalBody>
      )}
    </Modal>
  );
};

export default PlotResultModal;
