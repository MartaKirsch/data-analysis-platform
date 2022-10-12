import { createContext } from "react";
import { XYCoord } from "react-dnd";
import { Connection } from "../types/Connection";
import { Coordinate } from "../types/Coordinate";
import { CalculationNode, DataNode, NodeData, ResultNode } from "../types/Node";

type Context = {
  dataNodes: DataNode[];
  calculationNodes: CalculationNode[];
  resultNodes: ResultNode[];
  connections: Connection[];
  coordinates: Coordinate[];
  addDataNode: (node: DataNode) => void;
  addCalculationNode: (node: CalculationNode) => void;
  addResultNode: (node: ResultNode) => void;
  moveNode: (id: string, offset: XYCoord) => void;
  addCoordinates: (coordinates: Coordinate) => void;
  connect: (connection: Connection) => void;
  disconnect: (nodeId: string, secondNodeId: string) => void;
  setNodeData: (nodeId: string, data: NodeData) => void;
};

export const BoardContext = createContext<Context>({
  dataNodes: [],
  calculationNodes: [],
  resultNodes: [],
  connections: [],
  coordinates: [],
  addDataNode: () => {},
  addCalculationNode: () => {},
  addResultNode: () => {},
  moveNode: () => {},
  addCoordinates: () => {},
  connect: () => {},
  disconnect: () => {},
  setNodeData: () => {},
});
