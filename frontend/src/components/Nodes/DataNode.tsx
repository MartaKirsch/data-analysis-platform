import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType, NodeDataType } from "../../types/Node";
import { renderDataNodeIcon } from "../../utils/nodes/renderDataNodeIcon";
import { Node } from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  modal?: JSX.Element;
  dataType: NodeDataType;
}

const DataNode: FC<Props> = ({ top, left, id, modal, dataType }) => {
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
        {renderDataNodeIcon(dataType)}
      </Node>
    </>
  );
};

export default DataNode;
