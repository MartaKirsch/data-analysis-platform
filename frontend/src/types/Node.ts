export enum NodeType {
  Data,
  Calculation,
  Visualization,
}

export enum NodeDataType {
  Manual,
  File,
}

export enum CalculationType {
  Sum,
  Substract,
}

export type NodeData = number[][] | File | undefined;

type NodeBase = {
  id: string;
  type: NodeType;
};

export type DataNode = NodeBase & {
  dataType: NodeDataType;
  data: NodeData;
};

export type CalculationNode = NodeBase & {
  type: NodeType.Calculation;
  calculationType: CalculationType;
};

export type VisualizationNode = NodeBase & {
  type: NodeType.Visualization;
};

export type Node = DataNode | CalculationNode | VisualizationNode;
