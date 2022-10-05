import { RefObject } from "react";

export enum NodeType {
  Data = "DATA_NODE",
  Calculation = "CALCULATION_NODE",
  Result = "RESULT_NODE",
}

export enum NodeDataType {
  Manual = "MANUAL_DATA_TYPE",
  File = "FILE_DATA_TYPE",
}

export enum CalculationType {
  LinearRegression = "LINEAR_REGRESSION",
}

export enum ResultType {
  File = "FILE_RESULT_TYPE",
  Plot = "PLOT_RESULT_TYPE",
}

export type NodeData = number[][] | File | undefined;

type NodeBase = {
  id: string;
  type: NodeType;
  ref?: RefObject<HTMLDivElement>;
};

export type DataNode = NodeBase & {
  dataType: NodeDataType;
  data: NodeData;
};

export type CalculationNode = NodeBase & {
  type: NodeType.Calculation;
  calculationType: CalculationType;
};

export type ResultNode = NodeBase & {
  type: NodeType.Result;
  resultType: ResultType;
};

export type Node = DataNode | CalculationNode | ResultNode;
