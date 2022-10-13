import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { useCanDropResultNode } from "../../hooks/useCanDropResultNode";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType, ResultType } from "../../types/Node";
import { renderResultNodeIcon } from "../../utils/nodes/renderResultNodeIcon";
import Node from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  modal?: JSX.Element;
  resultType: ResultType;
}

const ResultNode: FC<Props> = ({ top, left, id, modal, resultType }) => {
  const { nodes, connect } = useBoardContext();

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
      {modal}
      <Node
        left={left}
        top={top}
        nodeType={NodeType.Result}
        ref={mergeRefs([drag, drop])}
        modal={<></>}
        isModalOpen={false}
        onNodeClick={() => {}}
      >
        {renderResultNodeIcon(resultType)}
      </Node>
    </>
  );
};

export default ResultNode;
