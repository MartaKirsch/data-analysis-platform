import { IdBasedConnection } from "../types/Connection";

export const useBuildTree = () => {
  const getConnectedNodesIds = (
    connections: IdBasedConnection[],
    id: string
  ) => {
    const nodeConnections = connections.filter((connection) =>
      connection.some((el) => el === id)
    );
    const connectedNodesRefs = nodeConnections.flatMap(
      (connection) => connection.find((el) => el !== id)!
    );
    return connectedNodesRefs.map((el) => el);
  };

  const buildBranchesFromNode = (
    connections: IdBasedConnection[],
    nodeId: string
  ) => {
    const branches: string[][] = [];
    const connectedNodesIds = getConnectedNodesIds(connections, nodeId);

    if (!connectedNodesIds.length) {
      return [[nodeId]];
    } else {
      connectedNodesIds.forEach((connectedNodesId) => {
        const remainingConnections = connections.filter(
          (connection) => !connection.some((el) => el === nodeId)
        );
        const nextBranches = buildBranchesFromNode(
          remainingConnections,
          connectedNodesId
        );
        nextBranches.forEach((branch) => branch.unshift(nodeId));
        branches.push(...nextBranches);
      });
      return branches;
    }
  };

  return { buildBranchesFromNode };
};
