import React, { FC } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import {
  ModalCloseButton,
  ModalHeader,
  ModalInnerWrapper,
  ModalWrapper,
} from "./Modal.components";
import { ReactComponent as CloseIcon } from "../../../img/close.svg";

export interface ModalProps extends ComponentWithChildren {
  backgroundColor: string;
  onClose: () => void;
  modalHeader: { text: string; backgroundColor: string; color?: string };
  dataId?: string;
}

const Modal: FC<ModalProps> = ({
  backgroundColor,
  onClose,
  modalHeader,
  dataId,
  children,
}) => {
  return (
    <ModalWrapper data-id={dataId}>
      <ModalInnerWrapper backgroundColor={backgroundColor}>
        <ModalCloseButton onClick={onClose} data-id="close-modal">
          <CloseIcon />
        </ModalCloseButton>
        <ModalHeader
          backgroundColor={modalHeader.backgroundColor}
          color={modalHeader.color}
        >
          {modalHeader.text}
        </ModalHeader>
        {children}
      </ModalInnerWrapper>
    </ModalWrapper>
  );
};

export default Modal;
