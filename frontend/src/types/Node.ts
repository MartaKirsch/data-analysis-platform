import { RefObject } from "react";

export enum NodeType {
  Data = "DATA_NODE",
  Calculation = "CALCULATION_NODE",
  Result = "RESULT_NODE",
}

export enum NodeDataType {
  Manual = "manual",
  File = "file",
}

export enum CalculationType {
  LinearRegression = "linear_regression",
  PCA = "pca",
  NaiveBayes = "naive_bayes",
  DecisionTree = "decision_tree",
  RandomForest = "random_forest",
}

export enum ResultType {
  File = "file",
  Plot = "plot",
  Prediction = "prediction",
}

export type NodeData = number[][] | File | undefined;

type NodeBase = {
  id: string;
  type: NodeType;
  ref?: RefObject<HTMLDivElement>;
};

export type DataNodeError = { calcNodeId: string; message: string };

export type DataNode = NodeBase & {
  dataType: NodeDataType;
  data: NodeData;
  type: NodeType.Data;
  errors: DataNodeError[];
};

export type CalculationNode = NodeBase & {
  type: NodeType.Calculation;
  calculationType: CalculationType;
  parameters?: CalculationNodeParameters;
  error?: string;
};

export type ResultNode = NodeBase & {
  type: NodeType.Result;
  resultType: ResultType;
};

export type Node = DataNode | CalculationNode | ResultNode;

export type ClassParameters = { Class: string };
export type LinearRegressionParameters = { Indexes: number[] };
export type PCAparameters = ClassParameters;
export type NaiveBayesParameters = ClassParameters;
export type DecisionTreeParameters = ClassParameters;
export type RandomForestParameters = ClassParameters;

export type CalculationNodeParameters =
  | PCAparameters
  | NaiveBayesParameters
  | DecisionTreeParameters
  | RandomForestParameters
  | LinearRegressionParameters;
