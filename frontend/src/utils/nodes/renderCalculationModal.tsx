import PCAModal from "../../components/Modals/PCAModal";
import { CalculationNodeParameters, CalculationType } from "../../types/Node";

export const renderCalculationModal = (
  dataType: CalculationType,
  onCloseModal: () => void,
  nodeId: string,
  file?: File,
  parameters?: CalculationNodeParameters
) => {
  switch (dataType) {
    case CalculationType.PCA:
      return (
        <PCAModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters}
        />
      );
    default:
      return <></>;
  }
};
