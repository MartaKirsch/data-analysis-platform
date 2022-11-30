import PCAModal from "../../components/Modals/PCAModal";
import { CalculationType } from "../../types/Node";

export const renderCalculationModal = (
  dataType: CalculationType,
  onCloseModal: () => void,
  nodeId: string,
  file?: File
) => {
  switch (dataType) {
    case CalculationType.PCA:
      return <PCAModal onClose={onCloseModal} id={nodeId} file={file} />;
    default:
      return <></>;
  }
};
