import { useRef } from "react";
import { IdBasedConnection } from "../types/Connection";
import { CalculationNode, DataNode, Node, NodeType } from "../types/Node";
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

  const getConnectedCalculationNode = useRef(
    (nodes: Node[], branch: string[]) => {
      return nodes.find(
        (node) => branch.includes(node.id) && node.type === NodeType.Calculation
      ) as CalculationNode | undefined;
    }
  );

  const shouldSendGetResultRequest = useRef(() => {
    const resultNodeTreeBranch = buildBranchesFromNode(
      connections,
      resultNodeId
    ).flatMap((i) => i);

    const connectedDataNode = getConnectedDataNode.current(
      nodes,
      resultNodeTreeBranch
    );
    if (!connectedDataNode) return {};

    const connectedCalculationNode = getConnectedCalculationNode.current(
      nodes,
      resultNodeTreeBranch
    );

    const hasDataNodeConnected = !!connectedDataNode;
    const hasDataUploaded = !!connectedDataNode.data;
    const hasCorrectDataUploaded = !connectedDataNode.error;
    const hasCorrectParamsSet = !connectedCalculationNode?.error;
    return {
      hasDataNodeConnected,
      hasDataUploaded,
      hasCorrectDataUploaded,
      hasCorrectParamsSet,
    };
  });

  return { ...shouldSendGetResultRequest.current() };
};
