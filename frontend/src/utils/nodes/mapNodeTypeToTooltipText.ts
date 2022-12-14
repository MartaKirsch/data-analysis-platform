import { CalculationType, NodeDataType, ResultType } from "../../types/Node";

export const mapCalculationTypeToTooltipText = (
  calcType: CalculationType
): string => {
  switch (calcType) {
    case CalculationType.LinearRegression:
      return "Linear Regression";
    case CalculationType.PCA:
      return "PCA";
    case CalculationType.NaiveBayes:
      return "Naive Bayes";
  }
};

export const mapDataTypeToTooltipText = (dataType: NodeDataType): string => {
  switch (dataType) {
    case NodeDataType.File:
      return "Upload File";
    case NodeDataType.Manual:
      return "Set Manual Data";
  }
};

export const mapResultTypeToTooltipText = (resultType: ResultType): string => {
  switch (resultType) {
    case ResultType.File:
      return "See Result File";
    case ResultType.Plot:
      return "See Result Plot";
    case ResultType.Prediction:
      return "Make a Prediction";
  }
};
