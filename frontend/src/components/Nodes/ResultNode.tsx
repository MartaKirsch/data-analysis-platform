import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { mergeRefs } from "react-merge-refs";
import { useBoardContext } from "../../context/useBoardContext";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { DraggableType } from "../../types/DraggableType";
import { CalculationNode, NodeType, ResultType } from "../../types/Node";
import { renderResultNodeIcon } from "../../utils/nodes/renderResultNodeIcon";
import Node from "./Node";

interface Props extends ComponentWithChildren {
  top: number;
  left: number;
  id: string;
  modal?: JSX.Element;
  resultType: ResultType;
}

const ResultNode: FC<Props> = ({ top, left, id, modal, resultType }) => {
  const { resultNodes, connections, connect } = useBoardContext();

  const [, drag] = useDrag(() => ({
    type: DraggableType.ResultNode,
    item: resultNodes.find((resultNode) => resultNode.id === id),
  }));

  const [, drop] = useDrop<CalculationNode>(
    () => ({
      accept: DraggableType.CalculationNode,
      drop: (item) => {
        connect({ nodeId: id, prevId: item.id });
      },
      canDrop: (_item) => !connections.find((c) => c.nodeId === id)?.prevId,
    }),
    [connect, connections]
  );

  return (
    <>
      {modal}
      <Node
        left={left}
        top={top}
        nodeType={NodeType.Result}
        ref={mergeRefs([drag, drop])}
        modal={<></>}
        isModalOpen={false}
        onNodeClick={() => {}}
      >
        {renderResultNodeIcon(resultType)}
      </Node>
    </>
  );
};

export default ResultNode;
