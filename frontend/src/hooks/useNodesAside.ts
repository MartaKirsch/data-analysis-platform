import { useRef } from "react";
import { useDrag } from "react-dnd";
import { DraggableType } from "../types/DraggableType";
import { CalculationType, NodeDataType } from "../types/Node";

export const useNodesAside = () => {
  const addFileDataNodeButtonRef = useRef<HTMLDivElement>(null);
  const addSumCalculationNodeButtonRef = useRef<HTMLDivElement>(null);

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

  return {
    dragFileData,
    dragCalculationSum,
    buttonRefs: {
      addFileData: addFileDataNodeButtonRef,
      addSumCalculation: addSumCalculationNodeButtonRef,
    },
  };
};
