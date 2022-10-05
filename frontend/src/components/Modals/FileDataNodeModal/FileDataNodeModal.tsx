import React, { FC } from "react";
import { useTheme } from "styled-components";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType } from "../../../types/Node";
import Modal from "../../common/Modal/Modal";
import {
  UploadFileInput,
  UploadFileInputWrapper,
} from "./FileDataNodeModal.components";

interface FileDataNodeModalProps {
  onClose: () => void;
}

const FileDataNodeModal: FC<FileDataNodeModalProps> = ({ onClose }) => {
  const theme = useTheme();
  const nodeType = NodeType.Data;

  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType,
      })}
      onClose={onClose}
      modalHeader={{
        text: "Upload data file",
        backgroundColor: getNodeBackgroundHoverColor({ theme, nodeType }),
      }}
    >
      <UploadFileInputWrapper>
        <UploadFileInput type="file" />
      </UploadFileInputWrapper>
    </Modal>
  );
};

export default FileDataNodeModal;
