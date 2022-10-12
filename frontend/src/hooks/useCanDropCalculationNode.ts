import { CalculationType } from "../types/Node";
import { CalculationNodeReference } from "../types/NodeReference";
import { useCanDropNode } from "./useCanDropNode";

type CalculationNodeConnections = {
  [key in CalculationType]: CalculationType[];
};

const POSSIBLE_CONNECTIONS: CalculationNodeConnections = {
  [CalculationType.LinearRegression]: [],
};

export const useCanDropCalculationNode = () => {
  const { canDropNode } = useCanDropNode();

  const isConnectionPossible = (
    calculationType: CalculationType,
    secondCalculationType: CalculationType
  ) => {
    return POSSIBLE_CONNECTIONS[calculationType].some(
      (possibleToConnectType) => possibleToConnectType === secondCalculationType
    );
  };

  const canDropCalculationNode = (
    calculationNode: CalculationNodeReference,
    secondCalculationNode: CalculationNodeReference
  ) => {
    return (
      canDropNode(calculationNode.id, secondCalculationNode.id) &&
      isConnectionPossible(
        calculationNode.calculationType,
        secondCalculationNode.calculationType
      )
    );
  };

  return { canDropCalculationNode };
};
