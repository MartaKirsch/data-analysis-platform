import React, { FC } from "react";
import { PCAparameters } from "../../../types/Node";
import ClassParameterModal from "../../common/ClassParameterModal";

interface PCAModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: PCAparameters;
}

const PCAModal: FC<PCAModalProps> = (props) => {
  return <ClassParameterModal {...props} />;
};

export default PCAModal;
