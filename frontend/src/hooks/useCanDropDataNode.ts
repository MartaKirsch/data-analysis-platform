import { useBoardContext } from "../context/useBoardContext";
import { NodeType } from "../types/Node";
import { useCanDropNode } from "./useCanDropNode";

export const useCanDropDataNode = () => {
  const { connections } = useBoardContext();
  const { canDropNode } = useCanDropNode();

  const hasDataNodeConnected = (calculationNodeId: string) => {
    return connections.some(
      (connection) =>
        connection.some((el) => el.id === calculationNodeId) &&
        connection.some((el) => el.nodeType === NodeType.Data)
    );
  };

  const canDropDataNode = (dataNodeId: string, calculationNodeId: string) => {
    return (
      canDropNode(calculationNodeId, dataNodeId) &&
      !hasDataNodeConnected(calculationNodeId)
    );
  };

  return { canDropDataNode };
};
