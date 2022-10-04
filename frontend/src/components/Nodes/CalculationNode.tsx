import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationType, DataNode, NodeType } from "../../types/Node";
import { renderCalculationNodeIcon } from "../../utils/nodes/renderCalculationNodeIcon";
import { Node } from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  calculationType: CalculationType;
}

const CalculationNode: FC<Props> = ({ top, left, id, calculationType }) => {
  const { calculationNodes, connect, connections } = useBoardContext();

  const [, drag] = useDrag(() => ({
    type: DraggableType.CalculationNode,
    item: calculationNodes.find((calculationNode) => calculationNode.id === id),
  }));

  const [, drop] = useDrop<DataNode>(
    () => ({
      accept: DraggableType.DataNode,
      drop: (item) => {
        connect({ nodeId: id, prevId: item.id });
      },
      canDrop: (_item) => !connections.find((c) => c.nodeId === id)?.prevId,
    }),
    [connect, connections]
  );

  return (
    <Node
      left={left}
      top={top}
      nodeType={NodeType.Calculation}
      ref={mergeRefs([drag, drop])}
      title={`Calculation node with id ${id}`}
    >
      {renderCalculationNodeIcon(calculationType)}
    </Node>
  );
};

export default CalculationNode;