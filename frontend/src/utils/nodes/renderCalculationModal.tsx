import DecisionTreeModal from "../../components/Modals/DecisionTreeModal";
import NaiveBayesModal from "../../components/Modals/NaiveBayesModal";
import PCAModal from "../../components/Modals/PCAModal";
import RandomForestModal from "../../components/Modals/RandomForestModal";
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
    case CalculationType.NaiveBayes:
      return (
        <NaiveBayesModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters}
        />
      );
    case CalculationType.DecisionTree:
      return (
        <DecisionTreeModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters}
        />
      );
    case CalculationType.RandomForest:
      return (
        <RandomForestModal
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
