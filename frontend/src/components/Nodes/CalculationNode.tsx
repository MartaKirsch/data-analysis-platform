import { isEqual } from "lodash";
import React, { FC, useEffect, useRef, useState } from "react";
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
  CalculationNodeParameters,
  CalculationType,
  DataNode,
  NodeDataType,
  NodeType,
  ResultNode,
} from "../../types/Node";
import { mapCalculationTypeToTooltipText } from "../../utils/nodes/mapNodeTypeToTooltipText";
import { renderCalculationModal } from "../../utils/nodes/renderCalculationModal";
import { renderCalculationNodeIcon } from "../../utils/nodes/renderCalculationNodeIcon";
import NodeTippy from "../common/NodeTippy";
import NodeComponent from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  calculationType: CalculationType;
  parameters?: CalculationNodeParameters;
  error?: string;
}

const CalculationNode: FC<Props> = ({
  top,
  left,
  id,
  calculationType,
  parameters,
  error,
}) => {
  const prevParams = useRef(parameters);
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
      await sendDataCalculationConnectedRequest({
        file: draggedItem.data as File,
        calculationType,
        dataNodeId: draggedItem.id,
        calculationNodeId: id,
        parameters,
      });
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

  const calculationTypesWithModals = [
    CalculationType.PCA,
    CalculationType.NaiveBayes,
    CalculationType.DecisionTree,
  ];
  const hasModal = calculationTypesWithModals.includes(calculationType);
  const shouldRenderModal =
    hasModal && !!connectedDataNode && !!connectedDataNode.data;

  const handleNodeClick = () => {
    shouldRenderModal && setIsModalOpen(true);
  };

  useEffect(() => {
    const handleParamsChange = async () => {
      const hasParamsChanged = !isEqual(prevParams.current, parameters);
      if (!hasParamsChanged) return;

      prevParams.current = parameters;

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
      const connectedDataNode = connectedNodes?.find(
        (node) => node.type === NodeType.Data
      ) as DataNode | undefined;

      if (
        connectedDataNode?.data &&
        connectedDataNode?.dataType === NodeDataType.File
      ) {
        await sendDataCalculationConnectedRequest({
          file: connectedDataNode.data as File,
          calculationType: calculationType,
          dataNodeId: connectedDataNode.id,
          calculationNodeId: id,
          parameters: parameters,
        });
      }
    };
    handleParamsChange();
  }, [
    nodes,
    connections,
    id,
    parameters,
    calculationType,
    sendDataCalculationConnectedRequest,
  ]);

  return (
    <NodeTippy content={mapCalculationTypeToTooltipText(calculationType)}>
      <NodeComponent
        left={left}
        top={top}
        nodeType={NodeType.Calculation}
        ref={mergeRefs([
          drag,
          dropDataNode,
          dropResultNode,
          dropCalculationNode,
        ])}
        modal={renderCalculationModal(
          calculationType,
          () => setIsModalOpen(false),
          id,
          connectedDataNode?.data as File,
          parameters
        )}
        isModalOpen={isModalOpen}
        onNodeClick={handleNodeClick}
        isError={!!error}
      >
        {renderCalculationNodeIcon(calculationType)}
      </NodeComponent>
    </NodeTippy>
  );
};

export default CalculationNode;
