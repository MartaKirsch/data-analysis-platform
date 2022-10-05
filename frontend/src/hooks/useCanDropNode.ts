import { CalculationType, ResultType } from "../types/Node";
import { intersection } from "../utils/arrays/intersection";

const POSSIBLE_CONNECTIONS = [
  [CalculationType.LinearRegression, ResultType.File],
  [CalculationType.LinearRegression, ResultType.Plot],
];

export const useCanDropNode = () => {
  const getConnectionsByNodeType = (nodeType: string) =>
    POSSIBLE_CONNECTIONS.filter((connection) =>
      connection.some((el) => el === nodeType)
    );

  const canDropNode = (nodeType: string, secondNodeType: string) => {
    const nodeConnections = getConnectionsByNodeType(nodeType);
    const secondNodeConnections = getConnectionsByNodeType(secondNodeType);
    return !!intersection(nodeConnections, secondNodeConnections).length;
  };

  return { canDropNode };
};
