import React, { FC } from "react";
import { DecisionTreeParameters } from "../../../types/Node";
import ClassParameterModal from "../../common/ClassParameterModal";

interface DecisionTreeModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: DecisionTreeParameters;
}

const DecisionTreeModal: FC<DecisionTreeModalProps> = (props) => {
  return <ClassParameterModal {...props} />;
};

export default DecisionTreeModal;
