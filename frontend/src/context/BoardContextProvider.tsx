import React, { FC, useState } from "react";
import { BoardContext } from "./BoardContext";
import { CalculationNode, DataNode, NodeData } from "../types/Node";
import { ComponentWithChildren } from "../types/ComponentWithChildren";
import { XYCoord } from "react-dnd";
import { Coordinate } from "../types/Coordinate";
import { Connection } from "../types/Connection";

export const BoardContextProvider: FC<ComponentWithChildren> = ({
  children,
}) => {
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [calculationNodes, setCalculationNodes] = useState<CalculationNode[]>(
    []
  );
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const addDataNode = (node: DataNode) => {
    setDataNodes([...dataNodes, node]);
  };

  const addCalculationNode = (node: CalculationNode) => {
    setCalculationNodes([...calculationNodes, node]);
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

  const initiateConnections = (nodeId: string) => {
    setConnections([...connections, { nodeId }]);
  };

  const connect = (connection: Connection) => {
    const newConnections = [...connections];
    const connectionToUpdate = newConnections.find(
      (c) => c.nodeId === connection.nodeId
    )!;
    connectionToUpdate.prevId = connection.prevId;
    setConnections(newConnections);
  };

  const disconnect = (nodeId: string) => {
    connect({ nodeId });
  };

  const setNodeData = (nodeId: string, data: NodeData) => {
    const newDataNodes = [...dataNodes];
    const node = newDataNodes.find((dn) => dn.id === nodeId)!;
    node.data = data;
    setDataNodes(newDataNodes);
  };

  return (
    <BoardContext.Provider
      value={{
        dataNodes,
        addDataNode,
        calculationNodes,
        connections,
        coordinates,
        addCalculationNode,
        moveNode,
        addCoordinates,
        connect,
        initiateConnections,
        disconnect,
        setNodeData,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
