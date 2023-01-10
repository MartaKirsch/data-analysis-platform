import { CalculationType } from "../../types/Node";
import { DataCalculationConnectedRequestBody } from "../../types/requests/DataCalculationConnectedRequest";

export const validateConnectRequest = (
  req: DataCalculationConnectedRequestBody
): boolean => {
  switch (req.calculationType) {
    case CalculationType.LinearRegression:
      return (
        !!req.columnIndexes &&
        req.columnIndexes.length === 2 &&
        req.columnIndexes.every((i) => i !== undefined)
      );
    case CalculationType.PCA:
    case CalculationType.NaiveBayes:
    case CalculationType.DecisionTree:
    case CalculationType.RandomForest:
      return !!req.classes;
    default:
      return true;
  }
};
