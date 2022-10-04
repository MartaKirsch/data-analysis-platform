import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DraggableType } from "../types/DraggableType";
import { CalculationType, NodeDataType, ResultType } from "../types/Node";

export const useNodesAside = () => {
  const addFileDataNodeButtonRef = useRef<HTMLDivElement>(null);

  const addSumCalculationNodeButtonRef = useRef<HTMLDivElement>(null);

  const addScatterPlotResultNodeButtonRef = useRef<HTMLDivElement>(null);

  const [, dragFileData] = useDrag(() => ({
    type: DraggableType.AddDataNode,
    item: {
      dataType: NodeDataType.File,
      ref: addFileDataNodeButtonRef,
    },
  }));

  const [, dragCalculationSum] = useDrag(() => ({
    type: DraggableType.AddCalculationNode,
    item: {
      calculationType: CalculationType.Sum,
      ref: addSumCalculationNodeButtonRef,
    },
  }));

  const [, dragScatterPlotResult] = useDrag(() => ({
    type: DraggableType.AddResultNode,
    item: {
      resultType: ResultType.ScatterPlot,
      ref: addScatterPlotResultNodeButtonRef,
    },
  }));

  return {
    dragFileData,
    dragCalculationSum,
    dragScatterPlotResult,
    buttonRefs: {
      addFileData: addFileDataNodeButtonRef,
      addSumCalculation: addSumCalculationNodeButtonRef,
      addScatterPlotResult: addScatterPlotResultNodeButtonRef,
    },
  };
};
