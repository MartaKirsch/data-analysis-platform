import { IdBasedConnection } from "../types/Connection";

export const useTraverseGraph = () => {
  const getConnectedNodesIds = (
    id: string,
    connections: IdBasedConnection[]
  ) => {
    const nodeConnections = connections.filter((connection) =>
      connection.some((connectionId) => connectionId === id)
    );
    return nodeConnections
      .flatMap((connection) => connection)
      .filter((connectionId) => connectionId !== id);
  };

  const traverseFromNode = (
    nodeId: string,
    connections: IdBasedConnection[]
  ): string[] => {
    const visitedNodesIds: string[] = [nodeId];
    const connectedNodesIds = getConnectedNodesIds(nodeId, connections);

    if (!connectedNodesIds.length) {
      return [nodeId];
    } else {
      connectedNodesIds.forEach((connectedNodeId) => {
        const remainingConnections = connections.filter(
          (connection) => !connection.some((id) => id === nodeId)
        );
        const nextVisitedNodesIds = traverseFromNode(
          connectedNodeId,
          remainingConnections
        );
        visitedNodesIds.push(...nextVisitedNodesIds);
      });
      return visitedNodesIds;
    }
  };

  return { traverseFromNode };
};
