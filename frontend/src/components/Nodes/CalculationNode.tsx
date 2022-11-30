import React, { FC, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { useCanDropCalculationNode } from "../../hooks/useCanDropCalculationNode";
import { useCanDropDataNode } from "../../hooks/useCanDropDataNode";
import { useCanDropResultNode } from "../../hooks/useCanDropResultNode";
import { useSendDataCalculationConnected } from "../../hooks/useSendDataCalculationConnected";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import {
  CalculationNode as CalculationNodeType,
  CalculationType,
  DataNode,
  NodeDataType,
  NodeType,
  ResultNode,
} from "../../types/Node";
import { renderCalculationModal } from "../../utils/nodes/renderCalculationModal";
import { renderCalculationNodeIcon } from "../../utils/nodes/renderCalculationNodeIcon";
import NodeComponent from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  calculationType: CalculationType;
}

const CalculationNode: FC<Props> = ({ top, left, id, calculationType }) => {
  const { nodes, connect, connections } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sendDataCalculationConnectedRequest } =
    useSendDataCalculationConnected();

  const handleDropDataNode = async (draggedItem: DataNode) => {
    connect([
      { id, nodeType: NodeType.Calculation },
      { id: draggedItem.id, nodeType: draggedItem.type },
    ]);

    if (draggedItem.data && draggedItem.dataType === NodeDataType.File)
      await sendDataCalculationConnectedRequest(
        draggedItem.data as File,
        calculationType,
        id,
        draggedItem.id
      );
  };

  const { canDropDataNode } = useCanDropDataNode();
  const { canDropCalculationNode } = useCanDropCalculationNode();
  const { canDropResultNode } = useCanDropResultNode();

  const [, drag] = useDrag(() => ({
    type: DraggableType.CalculationNode,
    item: nodes.find((node) => node.id === id),
  }));

  const [, dropDataNode] = useDrop<DataNode>(
    () => ({
      accept: DraggableType.DataNode,
      drop: handleDropDataNode,
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
          { id: draggedItem.id, calculationType: draggedItem.calculationType },
          { id, calculationType }
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

  const nodeConnections = [...connections].filter((c) =>
    c.some((pair) => pair.id === id)
  );
  const connectedNodesIds = nodeConnections
    .map((pair) => pair.filter((item) => item.id !== id).map((item) => item.id))
    .flatMap((i) => i);
  const connectedNodes = [...nodes].filter((node) =>
    connectedNodesIds.includes(node.id)
  );
  const connectedDataNode = connectedNodes?.find(
    (node) => node.type === NodeType.Data
  ) as DataNode;

  const calculationTypesWithModals = [CalculationType.PCA];
  const hasModal = calculationTypesWithModals.includes(calculationType);
  const shouldRenderModal =
    hasModal && !!connectedDataNode && !!connectedDataNode.data;

  const handleNodeClick = () => {
    shouldRenderModal && setIsModalOpen(true);
  };

  return (
    <NodeComponent
      left={left}
      top={top}
      nodeType={NodeType.Calculation}
      ref={mergeRefs([drag, dropDataNode, dropResultNode, dropCalculationNode])}
      modal={renderCalculationModal(
        calculationType,
        () => setIsModalOpen(false),
        id
      )}
      isModalOpen={isModalOpen}
      onNodeClick={handleNodeClick}
    >
      {renderCalculationNodeIcon(calculationType)}
    </NodeComponent>
  );
};

export default CalculationNode;
