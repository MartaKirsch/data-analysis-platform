import React, { FC, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType, NodeDataType } from "../../types/Node";
import { renderDataNodeIcon } from "../../utils/nodes/renderDataNodeIcon";
import FileDataNodeModal from "../Modals/DataNodeModals/FileDataNodeModal";
import { Node } from "./Node";

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
    <>
      {isModalOpen && (
        <FileDataNodeModal onClose={() => setIsModalOpen(false)} />
      )}
      <Node
        left={left}
        top={top}
        nodeType={NodeType.Data}
        ref={mergeRefs([drag, drop])}
        onClick={() => setIsModalOpen(true)}
      >
        {renderDataNodeIcon(dataType)}
      </Node>
    </>
  );
};

export default DataNode;
