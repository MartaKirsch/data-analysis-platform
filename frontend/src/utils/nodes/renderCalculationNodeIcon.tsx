import { ReactComponent as LinearRegressionIcon } from "../../img/nodeIcons/linear_regression.svg";
import { ReactComponent as PCAicon } from "../../img/nodeIcons/pca.svg";
import { CalculationType } from "../../types/Node";

export const renderCalculationNodeIcon = (calculationType: CalculationType) => {
  switch (calculationType) {
    case CalculationType.LinearRegression:
      return <LinearRegressionIcon />;
    case CalculationType.PCA:
      return <PCAicon />;
  }
};
