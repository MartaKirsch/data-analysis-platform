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
  modalHeader: { text: string; backgroundColor: string };
}

const Modal: FC<ModalProps> = ({
  backgroundColor,
  onClose,
  modalHeader,
  children,
}) => {
  return (
    <ModalWrapper>
      <ModalInnerWrapper backgroundColor={backgroundColor}>
        <ModalHeader backgroundColor={modalHeader.backgroundColor}>
          {modalHeader.text}
        </ModalHeader>
        {children}
        <ModalCloseButton onClick={onClose}>
          <CloseIcon />
        </ModalCloseButton>
      </ModalInnerWrapper>
    </ModalWrapper>
  );
};

export default Modal;
