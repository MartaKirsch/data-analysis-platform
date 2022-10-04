import { useRef, RefObject } from "react";
import { XYCoord, useDrop } from "react-dnd";
import { useBoardContext } from "../context/useBoardContext";
import { DraggableType } from "../types/DraggableType";
import {
  CalculationNode as CalculationNodeType,
  DataNode as DataNodeType,
  NodeDataType,
  Node,
  CalculationType,
} from "../types/Node";
import { createCalculationNode } from "../utils/nodes/createCalculationNode";
import { createDataNode } from "../utils/nodes/createDataNode";
import { addXYCoords } from "../utils/xyCoords/addXYCoords";
import { subXYCoords } from "../utils/xyCoords/subXYCoords";

export const useBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  const {
    addCalculationNode,
    addDataNode,
    coordinates,
    moveNode,
    addCoordinates,
    initiateConnections,
  } = useBoardContext();

  const handleAddCalculationNode = (
    offset: XYCoord,
    calculationType: CalculationType
  ) => {
    const calculationNode = createCalculationNode(calculationType);
    addCoordinates({
      nodeId: calculationNode.id,
      ...offset,
    });
    initiateConnections(calculationNode.id);
    addCalculationNode(calculationNode);
  };

  const handleAddDataNode = (offset: XYCoord, dataType: NodeDataType) => {
    const dataNode = createDataNode(dataType);
    addCoordinates({
      nodeId: dataNode.id,
      ...offset,
    });
    initiateConnections(dataNode.id);
    addDataNode(dataNode);
  };

  const calculateParentsCumulativeOffset = (
    element?: HTMLElement | null
  ): XYCoord => {
    let parentsOffsetTop = 0;
    let parentsOffsetLeft = 0;
    let parent = element?.parentElement;
    while (parent) {
      parentsOffsetTop += parent.offsetTop;
      parentsOffsetLeft += parent.offsetLeft;
      parent = parent.parentElement;
    }
    return { x: parentsOffsetLeft, y: parentsOffsetTop };
  };

  const calculateButtonOffset = (buttonRef?: RefObject<HTMLDivElement>) => {
    const parentsOffset = calculateParentsCumulativeOffset(buttonRef?.current);
    const addCalculationNodeButtonOffset = addXYCoords(parentsOffset, {
      x: buttonRef?.current?.offsetLeft || 0,
      y: buttonRef?.current?.offsetTop || 0,
    });

    return addCalculationNodeButtonOffset;
  };

  const [, drop] = useDrop<Node>(
    () => ({
      accept: [
        DraggableType.AddDataNode,
        DraggableType.AddCalculationNode,
        DraggableType.DataNode,
        DraggableType.CalculationNode,
      ],
      drop: (item, monitor) => {
        if (monitor.didDrop()) return;

        const itemType = monitor.getItemType();

        const boardOffset = {
          y: boardRef.current?.offsetTop || 0,
          x: boardRef.current?.offsetLeft || 0,
        };

        const itemCoordinates = coordinates.find(
          (coord) => coord.nodeId === item.id
        );

        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

        const offset = subXYCoords(delta, boardOffset);

        switch (itemType) {
          case DraggableType.AddDataNode:
            const addDataNodeButtonOffset = calculateButtonOffset(item.ref);
            handleAddDataNode(
              addXYCoords(offset, addDataNodeButtonOffset),
              (item as DataNodeType).dataType
            );
            break;
          case DraggableType.AddCalculationNode:
            const addCalculationNodeButtonOffset = calculateButtonOffset(
              item.ref
            );
            handleAddCalculationNode(
              addXYCoords(offset, addCalculationNodeButtonOffset),
              (item as CalculationNodeType).calculationType
            );
            break;
          case DraggableType.DataNode:
          case DraggableType.CalculationNode:
            const left = Math.round((itemCoordinates?.x || 0) + delta.x);
            const top = Math.round((itemCoordinates?.y || 0) + delta.y);

            moveNode(item.id, { x: left, y: top });
            break;
          default:
            break;
        }
      },
    }),
    [handleAddCalculationNode, handleAddCalculationNode, moveNode]
  );

  return { boardRef, drop };
};
