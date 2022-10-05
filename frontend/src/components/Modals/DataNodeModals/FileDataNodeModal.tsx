import React, { FC } from "react";
import { useTheme } from "styled-components";
import { getNodeBackgroundColor } from "../../../styles/mixins";
import { NodeType } from "../../../types/Node";
import Modal from "../../common/Modal/Modal";

interface FileDataNodeModalProps {
  onClose: () => void;
}

const FileDataNodeModal: FC<FileDataNodeModalProps> = ({ onClose }) => {
  const theme = useTheme();
  return (
    <Modal
      backgroundColor={getNodeBackgroundColor({
        theme,
        nodeType: NodeType.Data,
      })}
      onClose={onClose}
    >
      test test
    </Modal>
  );
};

export default FileDataNodeModal;
