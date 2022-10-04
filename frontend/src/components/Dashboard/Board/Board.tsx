import React, { FC } from "react";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../../context/useBoardContext";
import { useBoard } from "../../../hooks/useBoard";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import CalculationNode from "../../Nodes/CalculationNode";
import DataNode from "../../Nodes/DataNode";
import ResultNode from "../../Nodes/ResultNode";
import ConnectionsBoard from "../ConnectionsBoard";
import { BoardWrapper } from "./Board.components";

interface BoardProps extends ComponentWithChildren {}

const Board: FC<BoardProps> = () => {
  const { boardRef, drop } = useBoard();
  const { dataNodes, coordinates, calculationNodes, resultNodes } =
    useBoardContext();

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
      {resultNodes.map((cn) => {
        const coordinate = coordinates.find((coord) => coord.nodeId === cn.id)!;
        return (
          <ResultNode
            key={cn.id}
            id={cn.id}
            top={coordinate.y}
            left={coordinate.x}
            resultType={cn.resultType}
          />
        );
      })}
    </BoardWrapper>
  );
};

export default Board;
