import { useBoardContext } from "../context/useBoardContext";
import { Connection } from "../types/Connection";
import { findDuplicates } from "../utils/arrays/findDuplicates";
import { useTraverseGraph, TraverseGraphConnection } from "./useTraverseGraph";

export const useCanDropNode = () => {
  const { connections, dataNodes, calculationNodes, resultNodes } =
    useBoardContext();
  const { traverseFromNode } = useTraverseGraph();

  const mapConnectionToTraverseGraphConnection = (
    connection: Connection
  ): TraverseGraphConnection => [connection[0].id, connection[1].id];

  const willHaveOnlyOneDataNode = (visitedNodesIds: string[]) => {
    return (
      dataNodes.filter((dataNode) => visitedNodesIds.includes(dataNode.id))
        .length <= 1
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

  const willTreeStructureBeValid = (newConnection: TraverseGraphConnection) => {
    const traverseGraphConnections = connections.map(
      mapConnectionToTraverseGraphConnection
    );
    traverseGraphConnections.push(newConnection);

    const nodes = [...dataNodes, ...calculationNodes, ...resultNodes];

    for (const node of nodes) {
      const visitedNodesIds = traverseFromNode(
        node.id,
        traverseGraphConnections
      );

      if (!isSingleNodeTreeValid(visitedNodesIds)) return false;
    }
    return true;
  };

  const canDropNode = (...ids: [string, string]) => {
    return ids[0] !== ids[1] && willTreeStructureBeValid(ids);
  };

  return { canDropNode };
};
