import React, { FC } from "react";
import { NaiveBayesParameters } from "../../../types/Node";
import ClassParameterModal from "../../common/ClassParameterModal";

interface NaiveBayesModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: NaiveBayesParameters;
}

const NaiveBayesModal: FC<NaiveBayesModalProps> = (props) => {
  return <ClassParameterModal {...props} />;
};

export default NaiveBayesModal;
