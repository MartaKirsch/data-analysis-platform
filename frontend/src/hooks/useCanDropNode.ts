import { useBoardContext } from "../context/useBoardContext";
import { Connection, IdBasedConnection } from "../types/Connection";
import { CalculationNode, CalculationType, NodeType } from "../types/Node";
import { findDuplicates } from "../utils/arrays/findDuplicates";
import { useBuildTree } from "./useBuildTree";
import { POSSIBLE_CALCULATION_CONNECTIONS } from "./useCanDropCalculationNode";
import { useTraverseGraph } from "./useTraverseGraph";

export const useCanDropNode = () => {
  const { connections, nodes } = useBoardContext();
  const { traverseFromNode } = useTraverseGraph();
  const { buildBranchesFromNode } = useBuildTree();

  const isConnectionPossible = (
    calculationType: CalculationType,
    secondCalculationType: CalculationType
  ) => {
    return POSSIBLE_CALCULATION_CONNECTIONS[calculationType].some(
      (possibleToConnectType) => possibleToConnectType === secondCalculationType
    );
  };

  const mapConnectionToIdBased = (
    connection: Connection
  ): IdBasedConnection => [connection[0].id, connection[1].id];

  const willHaveOnlyOneDataNode = (visitedNodesIds: string[]) => {
    return (
      nodes.filter(
        (node) =>
          visitedNodesIds.includes(node.id) && node.type === NodeType.Data
      ).length <= 1
    );
  };

  const doesOnlyOnePathLeadToOneNode = (visitedNodesIds: string[]) => {
    return !findDuplicates(visitedNodesIds).length;
  };

  const isSingleNodeTreeValid = (visitedNodesIds: string[]) => {
    return (
      doesOnlyOnePathLeadToOneNode(visitedNodesIds) &&
      willHaveOnlyOneDataNode(visitedNodesIds)
    );
  };

  const willTreeStructureBeValid = (newConnection: IdBasedConnection) => {
    const idBasedConnections = connections.map(mapConnectionToIdBased);
    idBasedConnections.push(newConnection);

    for (const node of nodes) {
      const visitedNodesIds = traverseFromNode(node.id, idBasedConnections);

      if (!isSingleNodeTreeValid(visitedNodesIds)) return false;
    }
    return true;
  };

  const findDataNode = (nodeId: string) =>
    nodes.find((n) => n.id === nodeId && n.type === NodeType.Data);

  const findResultNode = (nodeId: string) =>
    nodes.find((n) => n.id === nodeId && n.type === NodeType.Result);

  const isCalculationNode = (nodeId: string) =>
    nodes.find((n) => n.id === nodeId && n.type === NodeType.Calculation);

  const getCalculationNodeCalculationType = (nodeId: string) =>
    (
      nodes.find(
        (n) => n.id === nodeId && n.type === NodeType.Calculation
      ) as CalculationNode
    ).calculationType;

  const checkCalculationConnectionsFromNode = (
    nodeId: string,
    connections: IdBasedConnection[],
    shouldReverseBranch?: boolean
  ) => {
    const branches = buildBranchesFromNode(connections, nodeId);
    for (let branch of branches) {
      if (shouldReverseBranch) branch = branch.reverse();

      const calculationNodesIds = branch.filter(isCalculationNode);

      for (let i = 0; i < calculationNodesIds.length - 1; i++) {
        const calcNodeId = calculationNodesIds[i];
        const nextCalcNodeId = calculationNodesIds[i + 1];
        if (
          !isConnectionPossible(
            getCalculationNodeCalculationType(calcNodeId),
            getCalculationNodeCalculationType(nextCalcNodeId)
          )
        )
          return false;
      }
    }

    return true;
  };

  const isTreeCorrectlyOriented = (ids: [string, string]) => {
    const newConnections: [string, string][] = connections.map((c) => [
      c[0].id,
      c[1].id,
    ]);
    newConnections.push(ids);

    const treeNodesIds = traverseFromNode(ids[0], newConnections);

    const dataNodeId = treeNodesIds.find(findDataNode);
    const resultNodeId = treeNodesIds.find(findResultNode);

    if (!!dataNodeId)
      return checkCalculationConnectionsFromNode(dataNodeId, newConnections);
    if (!!resultNodeId)
      return checkCalculationConnectionsFromNode(resultNodeId, newConnections);
    return true;
  };

  const canDropNode = (...ids: [string, string]) => {
    return (
      ids[0] !== ids[1] &&
      willTreeStructureBeValid(ids) &&
      isTreeCorrectlyOriented(ids)
    );
  };

  return { canDropNode };
};
