import React, { FC, useState } from "react";
import { BoardContext } from "./BoardContext";
import {
  CalculationNode,
  CalculationNodeParameters,
  DataNode,
  DataNodeError,
  Node,
  NodeData,
  NodeType,
} from "../types/Node";
import { ComponentWithChildren } from "../types/ComponentWithChildren";
import { XYCoord } from "react-dnd";
import { Coordinate } from "../types/Coordinate";
import { Connection } from "../types/Connection";
import { useDeepCompareCallback } from "use-deep-compare";

export const BoardContextProvider: FC<ComponentWithChildren> = ({
  children,
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const addNode = (node: Node) => {
    setNodes([...nodes, node]);
  };

  const updateNodeOffset = (coordinate: Coordinate, offset: XYCoord) => {
    coordinate.x = offset.x;
    coordinate.y = offset.y;
  };

  const moveNode = (id: string, offset: XYCoord) => {
    const newCoordinates = [...coordinates];
    const coordinateToChange = newCoordinates.find(
      (coordinate) => coordinate.nodeId === id
    )!;
    updateNodeOffset(coordinateToChange, offset);
    setCoordinates(newCoordinates);
  };

  const addCoordinates = (coordinate: Coordinate) => {
    setCoordinates([...coordinates, coordinate]);
  };

  const connect = (connection: Connection) => {
    const newConnections = [...connections];
    newConnections.push(connection);
    setConnections(newConnections);
  };

  const isConnectionWithIds = (
    connection: Connection,
    id: string,
    secondId: string
  ) => {
    const connectionIds = connection.map((el) => el.id);
    return (
      connectionIds.some((connectionId) => connectionId === id) &&
      connectionIds.some((connectionId) => connectionId === secondId)
    );
  };

  const clearDataNodeErrorOnDisconnect = (
    dataNode: DataNode,
    calcNodeId: string
  ) => {
    removeDataNodeError(dataNode.id, calcNodeId);
  };

  const clearCalculationNodeOnDisconnect = (calcNode: CalculationNode) => {
    setCalculationNodeError(calcNode.id, undefined);
    setNodeCalculationParameters(calcNode.id, undefined);
  };

  const disconnect = (nodeId: string, secondNodeId: string) => {
    const newConnections = [...connections].filter(
      (connection) => !isConnectionWithIds(connection, nodeId, secondNodeId)
    );
    setConnections(newConnections);

    const dataNode = nodes.find(
      (node) =>
        (node.id === nodeId || node.id === secondNodeId) &&
        node.type === NodeType.Data
    );
    const calcNode = nodes.find(
      (node) =>
        (node.id === nodeId || node.id === secondNodeId) &&
        node.type === NodeType.Calculation
    );
    if (dataNode && calcNode) {
      clearCalculationNodeOnDisconnect(calcNode as CalculationNode);
      clearDataNodeErrorOnDisconnect(dataNode as DataNode, calcNode.id);
    }
  };

  const setNodeData = useDeepCompareCallback(
    (nodeId: string, data: NodeData) => {
      const newNodes = [...nodes];
      const node = newNodes.find(
        (node) => node.id === nodeId && node.type === NodeType.Data
      )! as DataNode;
      node.data = data;
      setNodes(newNodes);
    },
    [nodes]
  );

  const setNodeCalculationParameters = useDeepCompareCallback(
    (nodeId: string, params?: CalculationNodeParameters) => {
      const newNodes = [...nodes];
      const node = newNodes.find(
        (node) => node.id === nodeId && node.type === NodeType.Calculation
      )! as CalculationNode;
      node.parameters = params;
      setNodes(newNodes);
    },
    [nodes]
  );

  const addDataNodeError = useDeepCompareCallback(
    (nodeId: string, error: DataNodeError) => {
      const newNodes = [...nodes];
      const node = newNodes.find(
        (node) => node.id === nodeId && node.type === NodeType.Data
      )! as DataNode;
      node.errors.push(error);
      setNodes(newNodes);
    },
    [nodes]
  );

  const removeDataNodeError = useDeepCompareCallback(
    (nodeId: string, calcNodeId: string) => {
      const newNodes = [...nodes];
      const node = newNodes.find(
        (node) => node.id === nodeId && node.type === NodeType.Data
      )! as DataNode;
      node.errors = node.errors.filter((e) => e.calcNodeId !== calcNodeId);
      setNodes(newNodes);
    },
    [nodes]
  );

  const setCalculationNodeError = useDeepCompareCallback(
    (nodeId: string, error?: string) => {
      const newNodes = [...nodes];
      const node = newNodes.find(
        (node) => node.id === nodeId && node.type === NodeType.Calculation
      )! as CalculationNode;
      node.error = error;
      setNodes(newNodes);
    },
    [nodes]
  );

  return (
    <BoardContext.Provider
      value={{
        nodes,
        addNode,
        connections,
        coordinates,
        moveNode,
        addCoordinates,
        connect,
        disconnect,
        setNodeData,
        setCalculationNodeError,
        setNodeCalculationParameters,
        addDataNodeError,
        removeDataNodeError,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
