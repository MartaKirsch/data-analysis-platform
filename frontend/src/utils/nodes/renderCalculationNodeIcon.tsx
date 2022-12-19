import { ReactComponent as LinearRegressionIcon } from "../../img/nodeIcons/linear_regression.svg";
import { ReactComponent as PCAicon } from "../../img/nodeIcons/pca.svg";
import { ReactComponent as NaiveBayesIcon } from "../../img/nodeIcons/naive_bayes.svg";
import { ReactComponent as NaiveBayesDecisionTreeIcon } from "../../img/nodeIcons/decision_tree.svg";
import { CalculationType } from "../../types/Node";

export const renderCalculationNodeIcon = (calculationType: CalculationType) => {
  switch (calculationType) {
    case CalculationType.LinearRegression:
      return <LinearRegressionIcon />;
    case CalculationType.PCA:
      return <PCAicon />;
    case CalculationType.NaiveBayes:
      return <NaiveBayesIcon />;
    case CalculationType.DecisionTree:
      return <NaiveBayesDecisionTreeIcon />;
  }
};
