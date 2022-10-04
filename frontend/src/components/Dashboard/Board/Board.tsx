import React, { FC, RefObject, useRef } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../../context/useBoardContext";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { DraggableType } from "../../../types/DraggableType";
import {
  CalculationType,
  CalculationNode as CalculationNodeType,
  Node,
  NodeDataType,
  DataNode as DataNodeType,
} from "../../../types/Node";
import { createCalculationNode } from "../../../utils/nodes/createCalculationNode";
import { createDataNode } from "../../../utils/nodes/createDataNode";
import { addXYCoords } from "../../../utils/xyCoords/addXYCoords";
import { subXYCoords } from "../../../utils/xyCoords/subXYCoords";
import CalculationNode from "../../Nodes/CalculationNode";
import DataNode from "../../Nodes/DataNode";
import ConnectionsBoard from "../ConnectionsBoard";
import { BoardWrapper } from "./Board.components";

interface BoardProps extends ComponentWithChildren {
  addFileDataNodeButtonRef: RefObject<HTMLDivElement>;
  addSumCalculationNodeButtonRef: RefObject<HTMLDivElement>;
}

const Board: FC<BoardProps> = ({
  addFileDataNodeButtonRef,
  addSumCalculationNodeButtonRef,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const {
    addCalculationNode,
    addDataNode,
    dataNodes,
    calculationNodes,
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
        const left = Math.round((itemCoordinates?.x || 0) + delta.x);
        const top = Math.round((itemCoordinates?.y || 0) + delta.y);

        const offset = subXYCoords(delta, boardOffset);

        switch (itemType) {
          case DraggableType.AddDataNode:
            const addDataNodeButtonOffset = {
              x: addFileDataNodeButtonRef.current?.offsetLeft || 0,
              y: addFileDataNodeButtonRef.current?.offsetTop || 0,
            };
            handleAddDataNode(
              addXYCoords(offset, addDataNodeButtonOffset),
              (item as DataNodeType).dataType
            );
            break;
          case DraggableType.AddCalculationNode:
            let parentsOffsetTop = 0;
            let parentsOffsetLeft = 0;
            let parent = addSumCalculationNodeButtonRef.current?.parentElement;
            while (parent) {
              parentsOffsetTop += parent.offsetTop;
              parentsOffsetLeft += parent.offsetLeft;
              parent = parent.parentElement;
            }
            const addCalculationNodeButtonOffset = {
              x:
                parentsOffsetLeft +
                (addSumCalculationNodeButtonRef.current?.offsetLeft || 0),
              y:
                parentsOffsetTop +
                (addSumCalculationNodeButtonRef.current?.offsetTop || 0),
            };
            handleAddCalculationNode(
              addXYCoords(offset, addCalculationNodeButtonOffset),
              (item as CalculationNodeType).calculationType
            );
            break;
          case DraggableType.DataNode:
            moveNode(item.id, { x: left, y: top });
            break;
          case DraggableType.CalculationNode:
            moveNode(item.id, { x: left, y: top });
            break;
          default:
            break;
        }
      },
    }),
    [handleAddCalculationNode, handleAddCalculationNode, moveNode]
  );

  return (
    <BoardWrapper ref={mergeRefs([boardRef, drop])}>
      <ConnectionsBoard />
      {dataNodes.map((dn) => {
        const coordinate = coordinates.find((coord) => coord.nodeId === dn.id)!;
        return (
          <DataNode
            key={dn.id}
            id={dn.id}
            top={coordinate.y}
            left={coordinate.x}
            dataType={dn.dataType}
          />
        );
      })}
      {calculationNodes.map((cn) => {
        const coordinate = coordinates.find((coord) => coord.nodeId === cn.id)!;
        return (
          <CalculationNode
            key={cn.id}
            id={cn.id}
            top={coordinate.y}
            left={coordinate.x}
            calculationType={cn.calculationType}
          />
        );
      })}
    </BoardWrapper>
  );
};

export default Board;
