import React, { FC, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType, NodeDataType } from "../../types/Node";
import { renderDataModal } from "../../utils/nodes/renderDataModal";
import { renderDataNodeIcon } from "../../utils/nodes/renderDataNodeIcon";
import Node from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  dataType: NodeDataType;
}

const DataNode: FC<Props> = ({ top, left, id, dataType }) => {
  const { dataNodes, connections, connect } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <Node
      left={left}
      top={top}
      nodeType={NodeType.Data}
      ref={mergeRefs([drag, drop])}
      modal={renderDataModal(dataType, () => setIsModalOpen(false))}
      onNodeClick={() => setIsModalOpen(true)}
      isModalOpen={isModalOpen}
    >
      {renderDataNodeIcon(dataType)}
    </Node>
  );
};

export default DataNode;
