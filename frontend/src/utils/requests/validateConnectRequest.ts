import { CalculationType } from "../../types/Node";
import { DataCalculationConnectedRequestBody } from "../../types/requests/DataCalculationConnectedRequest";

export const validateConnectRequest = (
  req: DataCalculationConnectedRequestBody
): boolean => {
  switch (req.calculationType) {
    case CalculationType.PCA:
    case CalculationType.NaiveBayes:
    case CalculationType.DecisionTree:
    case CalculationType.RandomForest:
      return !!req.classes;
    default:
      return true;
  }
};
