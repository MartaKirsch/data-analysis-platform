import DecisionTreeModal from "../../components/Modals/DecisionTreeModal";
import LinearRegressionModal from "../../components/Modals/LinearRegressionModal";
import NaiveBayesModal from "../../components/Modals/NaiveBayesModal";
import PCAModal from "../../components/Modals/PCAModal";
import RandomForestModal from "../../components/Modals/RandomForestModal";
import {
  CalculationNodeParameters,
  CalculationType,
  ClassParameters,
  LinearRegressionParameters,
} from "../../types/Node";

export const renderCalculationModal = (
  dataType: CalculationType,
  onCloseModal: () => void,
  nodeId: string,
  file?: File,
  parameters?: CalculationNodeParameters
) => {
  switch (dataType) {
    case CalculationType.LinearRegression:
      return (
        <LinearRegressionModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters as LinearRegressionParameters}
        />
      );
    case CalculationType.PCA:
      return (
        <PCAModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters as ClassParameters}
        />
      );
    case CalculationType.NaiveBayes:
      return (
        <NaiveBayesModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters as ClassParameters}
        />
      );
    case CalculationType.DecisionTree:
      return (
        <DecisionTreeModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters as ClassParameters}
        />
      );
    case CalculationType.RandomForest:
      return (
        <RandomForestModal
          onClose={onCloseModal}
          id={nodeId}
          file={file}
          parameters={parameters as ClassParameters}
        />
      );
    default:
      return <></>;
  }
};
