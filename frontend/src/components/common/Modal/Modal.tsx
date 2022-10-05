import React, { FC } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { ModalCloseButton, ModalWrapper } from "./Modal.components";
import { ReactComponent as CloseIcon } from "../../../img/close.svg";

interface ModalProps extends ComponentWithChildren {
  backgroundColor: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ backgroundColor, onClose, children }) => {
  return (
    <ModalWrapper backgroundColor={backgroundColor}>
      {children}
      <ModalCloseButton onClick={onClose}>
        <CloseIcon />
      </ModalCloseButton>
    </ModalWrapper>
  );
};

export default Modal;
