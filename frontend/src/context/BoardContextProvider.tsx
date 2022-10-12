import React, { FC, useState } from "react";
import { BoardContext } from "./BoardContext";
import { CalculationNode, DataNode, NodeData, ResultNode } from "../types/Node";
import { ComponentWithChildren } from "../types/ComponentWithChildren";
import { XYCoord } from "react-dnd";
import { Coordinate } from "../types/Coordinate";
import { Connection } from "../types/Connection";
import { useDeepCompareCallback } from "use-deep-compare";

export const BoardContextProvider: FC<ComponentWithChildren> = ({
  children,
}) => {
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [calculationNodes, setCalculationNodes] = useState<CalculationNode[]>(
    []
  );
  const [resultNodes, setResultNodes] = useState<ResultNode[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const addDataNode = (node: DataNode) => {
    setDataNodes([...dataNodes, node]);
  };

  const addCalculationNode = (node: CalculationNode) => {
    setCalculationNodes([...calculationNodes, node]);
  };

  const addResultNode = (node: ResultNode) => {
    setResultNodes([...resultNodes, node]);
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
      const newDataNodes = [...dataNodes];
      const node = newDataNodes.find((dn) => dn.id === nodeId)!;
      node.data = data;
      setDataNodes(newDataNodes);
    },
    [dataNodes]
  );

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
        disconnect,
        setNodeData,
        resultNodes,
        addResultNode,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
