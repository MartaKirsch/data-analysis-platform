import React, { FC, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { useCanDropDataNode } from "../../hooks/useCanDropDataNode";
import { useSendDataCalculationConnected } from "../../hooks/useSendDataCalculationConnected";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import {
  CalculationNode,
  NodeType,
  NodeDataType,
  NodeData,
  DataNodeError,
} from "../../types/Node";
import { renderDataModal } from "../../utils/nodes/renderDataModal";
import { renderDataNodeIcon } from "../../utils/nodes/renderDataNodeIcon";
import Node from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  dataType: NodeDataType;
  data: NodeData;
  errors: DataNodeError[];
}

const DataNode: FC<Props> = ({ top, left, id, dataType, data, errors }) => {
  const { nodes, connect, connections, setNodeCalculationParameters } =
    useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevData = useRef(data);

  const { sendDataCalculationConnectedRequest } =
    useSendDataCalculationConnected();

  useEffect(() => {
    const handleDataChange = async () => {
      const hasDataChanged =
        (prevData.current as File)?.size !== (data as File)?.size ||
        (prevData.current as File)?.name !== (data as File)?.name ||
        (prevData.current as File)?.type !== (data as File)?.type;
      if (!hasDataChanged) return;

      prevData.current = data;

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
      const connectedCalculationNodes = connectedNodes?.filter(
        (node) => node.type === NodeType.Calculation
      ) as CalculationNode[];
      connectedCalculationNodes.forEach((node) => {
        setNodeCalculationParameters(node.id, undefined);
      });

      if (data && dataType === NodeDataType.File) {
        const requestsToSend = connectedCalculationNodes.map((node) =>
          sendDataCalculationConnectedRequest({
            file: data as File,
            calculationType: node.calculationType,
            dataNodeId: id,
            calculationNodeId: node.id,
            parameters: node.parameters,
          })
        );

        await Promise.allSettled(requestsToSend);
      }
    };
    handleDataChange();
  }, [
    nodes,
    connections,
    id,
    data,
    dataType,
    sendDataCalculationConnectedRequest,
    setNodeCalculationParameters,
  ]);

  const handleDropCalculationNode = async (draggedItem: CalculationNode) => {
    connect([
      { id, nodeType: NodeType.Data },
      { id: draggedItem.id, nodeType: draggedItem.type },
    ]);

    if (data && dataType === NodeDataType.File)
      await sendDataCalculationConnectedRequest({
        file: data as File,
        calculationType: draggedItem.calculationType,
        dataNodeId: id,
        calculationNodeId: draggedItem.id,
        parameters: draggedItem.parameters,
      });
  };

  const { canDropDataNode } = useCanDropDataNode();

  const [, drag] = useDrag(() => ({
    type: DraggableType.DataNode,
    item: nodes.find((node) => node.id === id),
  }));

  const [, drop] = useDrop<CalculationNode>(
    () => ({
      accept: DraggableType.CalculationNode,
      drop: handleDropCalculationNode,
      canDrop: (draggedItem) => canDropDataNode(id, draggedItem.id),
    }),
    [connect, canDropDataNode]
  );

  return (
    <Node
      left={left}
      top={top}
      nodeType={NodeType.Data}
      ref={mergeRefs([drag, drop])}
      modal={renderDataModal(dataType, () => setIsModalOpen(false), id, errors)}
      onNodeClick={() => setIsModalOpen(true)}
      isModalOpen={isModalOpen}
      isError={!!errors.length}
    >
      {renderDataNodeIcon(dataType)}
    </Node>
  );
};

export default DataNode;
