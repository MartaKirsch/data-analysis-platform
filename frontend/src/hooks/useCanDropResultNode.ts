import { useBoardContext } from "../context/useBoardContext";
import { CalculationType, NodeType, ResultType } from "../types/Node";
import {
  CalculationNodeReference,
  ResultNodeReference,
} from "../types/NodeReference";
import { useCanDropNode } from "./useCanDropNode";

type CalculationNodeConnections = {
  [key in CalculationType]: ResultType[];
};

const POSSIBLE_CONNECTIONS: CalculationNodeConnections = {
  [CalculationType.LinearRegression]: [ResultType.File, ResultType.Plot],
  [CalculationType.PCA]: [ResultType.File, ResultType.Plot],
  [CalculationType.NaiveBayes]: [ResultType.File, ResultType.Prediction],
  [CalculationType.DecisionTree]: [
    ResultType.Plot,
    ResultType.Prediction,
    ResultType.File,
  ],
};

export const useCanDropResultNode = () => {
  const { connections } = useBoardContext();
  const { canDropNode } = useCanDropNode();

  const isConnectionPossible = (
    calculationType: CalculationType,
    resultType: ResultType
  ) => {
    return POSSIBLE_CONNECTIONS[calculationType].some(
      (possibleToConnectType) => possibleToConnectType === resultType
    );
  };

  const hasCalculationNodeConnected = (resultNodeId: string) => {
    return connections.some(
      (connection) =>
        connection.some((el) => el.id === resultNodeId) &&
        connection.some((el) => el.nodeType === NodeType.Calculation)
    );
  };

  const canDropResultNode = (
    calculationNodeRef: CalculationNodeReference,
    resultNodeRef: ResultNodeReference
  ) => {
    return (
      canDropNode(calculationNodeRef.id, resultNodeRef.id) &&
      isConnectionPossible(
        calculationNodeRef.calculationType,
        resultNodeRef.resultType
      ) &&
      !hasCalculationNodeConnected(resultNodeRef.id)
    );
  };

  return { canDropResultNode };
};
