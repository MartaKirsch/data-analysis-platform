import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { useCanDropCalculationNode } from "../../hooks/useCanDropCalculationNode";
import { useCanDropDataNode } from "../../hooks/useCanDropDataNode";
import { useCanDropResultNode } from "../../hooks/useCanDropResultNode";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import {
  CalculationNode as CalculationNodeType,
  CalculationType,
  DataNode,
  NodeType,
  ResultNode,
} from "../../types/Node";
import { renderCalculationNodeIcon } from "../../utils/nodes/renderCalculationNodeIcon";
import NodeComponent from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  calculationType: CalculationType;
}

const CalculationNode: FC<Props> = ({ top, left, id, calculationType }) => {
  const { calculationNodes, connect } = useBoardContext();

  const { canDropDataNode } = useCanDropDataNode();
  const { canDropCalculationNode } = useCanDropCalculationNode();
  const { canDropResultNode } = useCanDropResultNode();

  const [, drag] = useDrag(() => ({
    type: DraggableType.CalculationNode,
    item: calculationNodes.find((calculationNode) => calculationNode.id === id),
  }));

  const [, dropDataNode] = useDrop<DataNode>(
    () => ({
      accept: DraggableType.DataNode,
      drop: (draggedItem) => {
        connect([
          { id, nodeType: NodeType.Calculation },
          { id: draggedItem.id, nodeType: draggedItem.type },
        ]);
      },
      canDrop: (draggedItem) => canDropDataNode(draggedItem.id, id),
    }),
    [connect, canDropDataNode]
  );

  const [, dropCalculationNode] = useDrop<CalculationNodeType>(
    () => ({
      accept: DraggableType.CalculationNode,
      drop: (draggedItem) => {
        connect([
          { id, nodeType: NodeType.Calculation },
          { id: draggedItem.id, nodeType: draggedItem.type },
        ]);
      },
      canDrop: (draggedItem) =>
        canDropCalculationNode(
          { id, calculationType },
          { id: draggedItem.id, calculationType: draggedItem.calculationType }
        ),
    }),
    [connect, canDropCalculationNode]
  );

  const [, dropResultNode] = useDrop<ResultNode>(
    () => ({
      accept: DraggableType.ResultNode,
      drop: (draggedItem) => {
        connect([
          { id, nodeType: NodeType.Calculation },
          { id: draggedItem.id, nodeType: draggedItem.type },
        ]);
      },
      canDrop: (draggedItem) =>
        canDropResultNode(
          { id, calculationType },
          { id: draggedItem.id, resultType: draggedItem.resultType }
        ),
    }),
    [connect, canDropResultNode]
  );

  return (
    <NodeComponent
      left={left}
      top={top}
      nodeType={NodeType.Calculation}
      ref={mergeRefs([drag, dropDataNode, dropResultNode, dropCalculationNode])}
      modal={<></>}
      isModalOpen={false}
      onNodeClick={() => {}}
    >
      {renderCalculationNodeIcon(calculationType)}
    </NodeComponent>
  );
};

export default CalculationNode;
