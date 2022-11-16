import React, { FC, useEffect, useRef, useState } from "react";
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
import IconButton from "../../common/IconButton";
import Modal from "../../common/Modal/Modal";
import {
  FileResultModalBody,
  FileResultModalFilename,
  FileResultModalFileRow,
  FileResultModalLink,
} from "./FileResultModal.components";
import { ReactComponent as EyeIcon } from "../../../img/eye.svg";
import EditFileModal from "../EditFileModal";

interface FileResultModalProps {
  onClose: () => void;
  calculationNodeId: string;
  id: string;
}

const FileResultModal: FC<FileResultModalProps> = ({
  onClose,
  calculationNodeId,
  id,
}) => {
  const [isEditFileModalOpen, setIsEditFileModalOpen] = useState(false);
  const hasResultRequestBeenSent = useRef(false);
  const { nodes, connections } = useBoardContext();

  const { sendGetPlotRequest, plotUrl, plotFilename, file } =
    useSendGetResultRequest();

  const { shouldSendGetResultRequest } = useShouldSendGetResultRequest(
    nodes,
    connections.map(mapConnectionToIdBased),
    id
  );

  useEffect(() => {
    if (!shouldSendGetResultRequest || hasResultRequestBeenSent.current) return;
    sendGetPlotRequest(calculationNodeId, ResultType.File);
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
        <ErrorMessageBar
          message="No Data Node has been connected, it has no data provided or the
       provided data is invalid!"
        />
      )}
      {shouldSendGetResultRequest && (
        <FileResultModalBody>
          <FileResultModalFileRow>
            <FileResultModalFilename>{plotFilename}</FileResultModalFilename>
            {file && (
              <IconButton
                icon={<EyeIcon />}
                shouldResize
                size="sm"
                onClick={() => setIsEditFileModalOpen(true)}
              />
            )}
          </FileResultModalFileRow>
          <FileResultModalLink href={plotUrl} download={plotFilename}>
            Download
          </FileResultModalLink>
        </FileResultModalBody>
      )}
      {isEditFileModalOpen && file && (
        <EditFileModal
          onClose={() => setIsEditFileModalOpen(false)}
          file={file}
          nodeType={nodeType}
          headerText="View result file"
        />
      )}
    </Modal>
  );
};

export default FileResultModal;
