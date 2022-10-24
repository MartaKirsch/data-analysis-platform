import React, { FC, useState } from "react";
import { BoardContext } from "./BoardContext";
import { DataNode, Node, NodeData, NodeType } from "../types/Node";
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

  const disconnect = (nodeId: string, secondNodeId: string) => {
    const newConnections = [...connections].filter(
      (connection) => !isConnectionWithIds(connection, nodeId, secondNodeId)
    );
    setConnections(newConnections);
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
