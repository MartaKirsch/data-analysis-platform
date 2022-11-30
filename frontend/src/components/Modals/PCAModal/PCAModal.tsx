import React, { FC } from "react";
import { useTheme } from "styled-components";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType } from "../../../types/Node";
import Modal from "../../common/Modal/Modal";
import { PCAModalBody, PCAModalInnerBody } from "./PCAModal.components";

interface PCAModalProps {
  onClose: () => void;
  id: string;
}

const PCAModal: FC<PCAModalProps> = ({ onClose }) => {
  const theme = useTheme();
  const nodeType = NodeType.Calculation;

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
        <PCAModalInnerBody></PCAModalInnerBody>
      </PCAModalBody>
    </Modal>
  );
};

export default PCAModal;
