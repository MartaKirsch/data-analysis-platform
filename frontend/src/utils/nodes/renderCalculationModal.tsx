import PCAModal from "../../components/Modals/PCAModal";
import { CalculationType } from "../../types/Node";

export const renderCalculationModal = (
  dataType: CalculationType,
  onCloseModal: () => void,
  nodeId: string
) => {
  switch (dataType) {
    case CalculationType.PCA:
      return <PCAModal onClose={onCloseModal} id={nodeId} />;
    default:
      return <></>;
  }
};
