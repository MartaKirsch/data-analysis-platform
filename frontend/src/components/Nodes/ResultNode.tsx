import React, { FC, useMemo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { useCanDropResultNode } from "../../hooks/useCanDropResultNode";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType, ResultType } from "../../types/Node";
import { renderResultModal } from "../../utils/nodes/renderResultModal";
import { renderResultNodeIcon } from "../../utils/nodes/renderResultNodeIcon";
import Node from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  resultType: ResultType;
}

const ResultNode: FC<Props> = ({ top, left, id, resultType }) => {
  const { nodes, connect, connections } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculationNodeId = useMemo(() => {
    const nodeConnections = [...connections].filter((c) =>
      c.some((pair) => pair.id === id)
    );
    const connectedNodesIds = nodeConnections
      .map((pair) =>
        pair.filter((item) => item.id !== id).map((item) => item.id)
      )
      .flatMap((i) => i);
    const connectedNodes = [...nodes].filter((node) =>
      connectedNodesIds.includes(node.id)
    );
    const connectedCalculationNode = connectedNodes?.find(
      (node) => node.type === NodeType.Calculation
    );
    return connectedCalculationNode?.id || "";
  }, [connections, id, nodes]);

  const { canDropResultNode } = useCanDropResultNode();

  const [, drag] = useDrag(() => ({
    type: DraggableType.ResultNode,
    item: nodes.find((node) => node.id === id),
  }));

  const [, drop] = useDrop<CalculationNode>(
    () => ({
      accept: DraggableType.CalculationNode,
      drop: (draggedItem) => {
        connect([
          { id, nodeType: NodeType.Result },
          { id: draggedItem.id, nodeType: draggedItem.type },
        ]);
      },
      canDrop: (draggedItem) =>
        canDropResultNode(
          { id: draggedItem.id, calculationType: draggedItem.calculationType },
          { id, resultType }
        ),
    }),
    [connect, canDropResultNode]
  );

  return (
    <>
      <Node
        left={left}
        top={top}
        nodeType={NodeType.Result}
        ref={mergeRefs([drag, drop])}
        modal={renderResultModal(
          resultType,
          () => setIsModalOpen(false),
          calculationNodeId,
          id
        )}
        onNodeClick={() => setIsModalOpen(true)}
        isModalOpen={isModalOpen}
      >
        {renderResultNodeIcon(resultType)}
      </Node>
    </>
  );
};

export default ResultNode;
