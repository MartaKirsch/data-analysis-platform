import { createContext } from "react";
import { XYCoord } from "react-dnd";
import { Connection } from "../types/Connection";
import { Coordinate } from "../types/Coordinate";
import { CalculationNode, DataNode, NodeData } from "../types/Node";

type Context = {
  dataNodes: DataNode[];
  calculationNodes: CalculationNode[];
  connections: Connection[];
  coordinates: Coordinate[];
  addDataNode: (node: DataNode) => void;
  addCalculationNode: (node: CalculationNode) => void;
  moveNode: (id: string, offset: XYCoord) => void;
  addCoordinates: (coordinates: Coordinate) => void;
  initiateConnections: (nodeId: string) => void;
  connect: (connection: Connection) => void;
  disconnect: (nodeId: string) => void;
  setNodeData: (nodeId: string, data: NodeData) => void;
};

export const BoardContext = createContext<Context>({
  dataNodes: [],
  calculationNodes: [],
  connections: [],
  coordinates: [],
  addDataNode: () => {},
  addCalculationNode: () => {},
  moveNode: () => {},
  addCoordinates: () => {},
  initiateConnections: () => {},
  connect: () => {},
  disconnect: () => {},
  setNodeData: () => {},
});
