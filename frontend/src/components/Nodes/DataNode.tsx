import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType } from "../../types/Node";
import { Node } from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  modal?: JSX.Element;
  icon: JSX.Element;
}

const DataNode: FC<Props> = ({ top, left, id, modal, icon }) => {
  const { dataNodes, connections, connect } = useBoardContext();

  const [, drag] = useDrag(() => ({
    type: DraggableType.DataNode,
    item: dataNodes.find((dataNode) => dataNode.id === id),
  }));

  const [, drop] = useDrop<CalculationNode>(
    () => ({
      accept: DraggableType.CalculationNode,
      drop: (item) => {
        connect({ nodeId: item.id, prevId: id });
      },
      canDrop: (item) => !connections.find((c) => c.nodeId === item.id)?.prevId,
    }),
    [connect, connections]
  );

  return (
    <>
      {modal}
      <Node
        left={left}
        top={top}
        nodeType={NodeType.Data}
        ref={mergeRefs([drag, drop])}
        title={`Data node with id ${id}`}
      >
        {icon}
      </Node>
    </>
  );
};

export default DataNode;
