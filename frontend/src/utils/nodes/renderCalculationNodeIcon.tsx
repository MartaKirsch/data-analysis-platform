import { ReactComponent as LinearRegressionIcon } from "../../img/nodeIcons/linear_regression.svg";
import { CalculationType } from "../../types/Node";

export const renderCalculationNodeIcon = (calculationType: CalculationType) => {
  switch (calculationType) {
    case CalculationType.LinearRegression:
      return <LinearRegressionIcon />;
  }
};
