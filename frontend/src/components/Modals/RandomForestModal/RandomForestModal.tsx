import React, { FC } from "react";
import { RandomForestParameters } from "../../../types/Node";
import ClassParameterModal from "../../common/ClassParameterModal";

interface RandomForestModalProps {
  onClose: () => void;
  id: string;
  file?: File;
  parameters?: RandomForestParameters;
}

const RandomForestModal: FC<RandomForestModalProps> = (props) => {
  return <ClassParameterModal {...props} />;
};

export default RandomForestModal;
