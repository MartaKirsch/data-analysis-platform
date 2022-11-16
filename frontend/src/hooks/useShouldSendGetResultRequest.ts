import { useRef } from "react";
import { IdBasedConnection } from "../types/Connection";
import { DataNode, Node, NodeType } from "../types/Node";
import { useBuildTree } from "./useBuildTree";

export const useShouldSendGetResultRequest = (
  nodes: Node[],
  connections: IdBasedConnection[],
  resultNodeId: string
) => {
  const { buildBranchesFromNode } = useBuildTree();

  const getConnectedDataNode = useRef((nodes: Node[], branch: string[]) => {
    return nodes.find(
      (node) => branch.includes(node.id) && node.type === NodeType.Data
    ) as DataNode | undefined;
  });

  const shouldSendGetResultRequest = useRef(() => {
    const resultNodeTreeBranch = buildBranchesFromNode(
      connections,
      resultNodeId
    ).flatMap((i) => i);

    const connectedDataNode = getConnectedDataNode.current(
      nodes,
      resultNodeTreeBranch
    );
    if (!connectedDataNode) return false;

    const hasDataNodeConnected = !!connectedDataNode;
    const hasDataUploaded = !!connectedDataNode.data;
    return hasDataNodeConnected && hasDataUploaded;
  });

  return { shouldSendGetResultRequest: shouldSendGetResultRequest.current() };
};
