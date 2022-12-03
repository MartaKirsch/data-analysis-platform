import { createContext } from "react";
import { XYCoord } from "react-dnd";
import { Connection } from "../types/Connection";
import { Coordinate } from "../types/Coordinate";
import { CalculationNodeParameters, Node, NodeData } from "../types/Node";

type Context = {
  nodes: Node[];
  connections: Connection[];
  coordinates: Coordinate[];
  addNode: (node: Node) => void;
  moveNode: (id: string, offset: XYCoord) => void;
  addCoordinates: (coordinates: Coordinate) => void;
  connect: (connection: Connection) => void;
  disconnect: (nodeId: string, secondNodeId: string) => void;
  setNodeData: (nodeId: string, data: NodeData) => void;
  setNodeCalculationParameters: (
    nodeId: string,
    params?: CalculationNodeParameters
  ) => void;
  setNodeError: (nodeId: string, error?: string) => void;
};

export const BoardContext = createContext<Context>({
  nodes: [],
  connections: [],
  coordinates: [],
  addNode: () => {},
  moveNode: () => {},
  addCoordinates: () => {},
  connect: () => {},
  disconnect: () => {},
  setNodeData: () => {},
  setNodeError: () => {},
  setNodeCalculationParameters: () => {},
});
