import { CalculationType } from "../types/Node";
import { CalculationNodeReference } from "../types/NodeReference";
import { useCanDropNode } from "./useCanDropNode";

type CalculationNodeConnections = {
  [key in CalculationType]: CalculationType[];
};

export const POSSIBLE_CALCULATION_CONNECTIONS: CalculationNodeConnections = {
  [CalculationType.LinearRegression]: [],
};

export const useCanDropCalculationNode = () => {
  const { canDropNode } = useCanDropNode();

  const isConnectionPossible = (
    calculationType: CalculationType,
    secondCalculationType: CalculationType
  ) => {
    return POSSIBLE_CALCULATION_CONNECTIONS[calculationType].some(
      (possibleToConnectType) => possibleToConnectType === secondCalculationType
    );
  };

  const canDropCalculationNode = (
    draggedCalculationNode: CalculationNodeReference,
    calculationNodeDroppedOn: CalculationNodeReference
  ) => {
    return (
      canDropNode(draggedCalculationNode.id, calculationNodeDroppedOn.id) &&
      isConnectionPossible(
        draggedCalculationNode.calculationType,
        calculationNodeDroppedOn.calculationType
      )
    );
  };

  return { canDropCalculationNode };
};