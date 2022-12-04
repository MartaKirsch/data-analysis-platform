import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DraggableType } from "../types/DraggableType";
import { CalculationType, NodeDataType, ResultType } from "../types/Node";

export const useNodesAside = () => {
  const addFileDataNodeButtonRef = useRef<HTMLDivElement>(null);

  const addLinearRegressionNodeButtonRef = useRef<HTMLDivElement>(null);
  const addPCAnodeButtonRef = useRef<HTMLDivElement>(null);

  const addPlotResultNodeButtonRef = useRef<HTMLDivElement>(null);
  const addFileResultNodeButtonRef = useRef<HTMLDivElement>(null);

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

  return {
    dragFileData,
    dragLinearRegression,
    dragPlotResult,
    dragFileResult,
    dragPCA,
    buttonRefs: {
      addFileData: addFileDataNodeButtonRef,
      addLinearRegressionCalculation: addLinearRegressionNodeButtonRef,
      addPCAcalculation: addPCAnodeButtonRef,
      addPlotResult: addPlotResultNodeButtonRef,
      addFileResult: addFileResultNodeButtonRef,
    },
  };
};
