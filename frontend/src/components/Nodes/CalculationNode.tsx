import React, { FC, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationType, DataNode, NodeType } from "../../types/Node";
import { Node } from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  calculationType: CalculationType;
}

const CalculationNode: FC<Props> = ({ top, left, id, calculationType }) => {
  const { calculationNodes, connect, connections, dataNodes } =
    useBoardContext();

  const [, drag] = useDrag(() => ({
    type: DraggableType.CalculationNode,
    item: calculationNodes.find((calculationNode) => calculationNode.id === id),
  }));

  const [, drop] = useDrop<DataNode>(
    () => ({
      accept: DraggableType.DataNode,
      drop: (item) => {
        connect({ nodeId: id, prevId: item.id });
      },
      canDrop: (item) => !connections.find((c) => c.nodeId === id)?.prevId,
    }),
    [connect, connections]
  );

  const connection = connections.find((c) => c.nodeId === id);

  const dataNode = useMemo(
    () => dataNodes.find((dn) => dn.id === connection?.prevId),
    [connection?.prevId, dataNodes]
  );

  const calculationResult = useMemo(() => {
    const data = (dataNode?.data || [[]]) as number[][];
    const flatData = data.flat();
    if (flatData.length === 0) return 0;
    const result =
      calculationType === CalculationType.Sum
        ? flatData.reduce((prev, current) => prev + current)
        : flatData.reduce((prev, current) => prev - current);
    return result;
  }, [dataNode?.data, calculationType]);

  return (
    <Node
      left={left}
      top={top}
      nodeType={NodeType.Calculation}
      ref={mergeRefs([drag, drop])}
      title={`Calculation node with id ${id}`}
      onClick={() => alert(`Calculation result is: ${calculationResult}`)}
    >
      {calculationType === CalculationType.Sum ? "Sum" : "Sub"}
    </Node>
  );
};

export default CalculationNode;
