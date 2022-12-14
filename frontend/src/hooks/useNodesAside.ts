import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DraggableType } from "../types/DraggableType";
import { CalculationType, NodeDataType, ResultType } from "../types/Node";

export const useNodesAside = () => {
  const addFileDataNodeButtonRef = useRef<HTMLDivElement>(null);

  const addLinearRegressionNodeButtonRef = useRef<HTMLDivElement>(null);
  const addPCAnodeButtonRef = useRef<HTMLDivElement>(null);
  const addNaiveBayesNodeButtonRef = useRef<HTMLDivElement>(null);

  const addPlotResultNodeButtonRef = useRef<HTMLDivElement>(null);
  const addFileResultNodeButtonRef = useRef<HTMLDivElement>(null);
  const addPredictionResultNodeButtonRef = useRef<HTMLDivElement>(null);

  const [, dragFileData] = useDrag(() => ({
    type: DraggableType.AddDataNode,
    item: {
      dataType: NodeDataType.File,
      ref: addFileDataNodeButtonRef,
    },
  }));

  const [, dragLinearRegression] = useDrag(() => ({
    type: DraggableType.AddCalculationNode,
    item: {
      calculationType: CalculationType.LinearRegression,
      ref: addLinearRegressionNodeButtonRef,
    },
  }));

  const [, dragPCA] = useDrag(() => ({
    type: DraggableType.AddCalculationNode,
    item: {
      calculationType: CalculationType.PCA,
      ref: addPCAnodeButtonRef,
    },
  }));

  const [, dragNaiveBayes] = useDrag(() => ({
    type: DraggableType.AddCalculationNode,
    item: {
      calculationType: CalculationType.NaiveBayes,
      ref: addNaiveBayesNodeButtonRef,
    },
  }));

  const [, dragPlotResult] = useDrag(() => ({
    type: DraggableType.AddResultNode,
    item: {
      resultType: ResultType.Plot,
      ref: addPlotResultNodeButtonRef,
    },
  }));

  const [, dragFileResult] = useDrag(() => ({
    type: DraggableType.AddResultNode,
    item: {
      resultType: ResultType.File,
      ref: addFileResultNodeButtonRef,
    },
  }));

  const [, dragPredictionResult] = useDrag(() => ({
    type: DraggableType.AddResultNode,
    item: {
      resultType: ResultType.Prediction,
      ref: addPredictionResultNodeButtonRef,
    },
  }));

  return {
    dragFileData,
    dragLinearRegression,
    dragPlotResult,
    dragFileResult,
    dragPredictionResult,
    dragPCA,
    dragNaiveBayes,
    buttonRefs: {
      addFileData: addFileDataNodeButtonRef,
      addLinearRegressionCalculation: addLinearRegressionNodeButtonRef,
      addPCAcalculation: addPCAnodeButtonRef,
      addNaiveBayesCalculation: addNaiveBayesNodeButtonRef,
      addPlotResult: addPlotResultNodeButtonRef,
      addFileResult: addFileResultNodeButtonRef,
      addPredictionResult: addPredictionResultNodeButtonRef,
    },
  };
};
