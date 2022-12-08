import React, { FC } from "react";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../../context/useBoardContext";
import { useBoard } from "../../../hooks/useBoard";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { Coordinate } from "../../../types/Coordinate";
import {
  DataNode as DataNodeType,
  CalculationNode as CalculationNodeType,
  ResultNode as ResultNodeType,
  NodeType,
  Node,
} from "../../../types/Node";
import CalculationNode from "../../Nodes/CalculationNode";
import DataNode from "../../Nodes/DataNode";
import ResultNode from "../../Nodes/ResultNode";
import ConnectionsBoard from "../ConnectionsBoard";
import { BoardWrapper } from "./Board.components";

interface BoardProps extends ComponentWithChildren {}

const Board: FC<BoardProps> = () => {
  const { boardRef, drop } = useBoard();
  const { nodes, coordinates } = useBoardContext();

  const renderDataNode = (node: DataNodeType, coordinate: Coordinate) => (
    <DataNode
      key={node.id}
      id={node.id}
      top={coordinate.y}
      left={coordinate.x}
      dataType={node.dataType}
      data={node.data}
      errors={node.errors}
    />
  );

  const renderCalculationNode = (
    node: CalculationNodeType,
    coordinate: Coordinate
  ) => (
    <CalculationNode
      key={node.id}
      id={node.id}
      top={coordinate.y}
      left={coordinate.x}
      calculationType={node.calculationType}
      parameters={node.parameters}
      error={node.error}
    />
  );

  const renderResultNode = (node: ResultNodeType, coordinate: Coordinate) => (
    <ResultNode
      key={node.id}
      id={node.id}
      top={coordinate.y}
      left={coordinate.x}
      resultType={node.resultType}
    />
  );

  const renderNodeByType = (node: Node) => {
    const coordinate = coordinates.find((coord) => coord.nodeId === node.id)!;
    switch (node.type) {
      case NodeType.Data:
        return renderDataNode(node, coordinate);
      case NodeType.Calculation:
        return renderCalculationNode(node, coordinate);
      case NodeType.Result:
        return renderResultNode(node, coordinate);
    }
  };

  return (
    <BoardWrapper ref={mergeRefs([boardRef, drop])}>
      <ConnectionsBoard />
      {nodes.map(renderNodeByType)}
    </BoardWrapper>
  );
};

export default Board;
