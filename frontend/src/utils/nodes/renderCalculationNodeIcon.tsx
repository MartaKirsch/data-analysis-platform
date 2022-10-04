import { ReactComponent as SumIcon } from "../../img/nodeIcons/sum.svg";
import { CalculationType } from "../../types/Node";

export const renderCalculationNodeIcon = (calculationType: CalculationType) => {
  switch (calculationType) {
    case CalculationType.Sum:
      return <SumIcon />;
  }
};
