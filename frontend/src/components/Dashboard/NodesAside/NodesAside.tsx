import React, { FC, RefObject } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodesAsideRow, NodesAsideWrapper } from "./NodesAside.components";
import NodeButton from "../../Nodes/NodeButton";
import { CalculationType, NodeDataType, NodeType } from "../../../types/Node";
import { useDrag } from "react-dnd";
import { DraggableType } from "../../../types/DraggableType";
import { mergeRefs } from "react-merge-refs";

interface NodesAsideProps extends ComponentWithChildren {
  addFileDataNodeButtonRef: RefObject<HTMLDivElement>;
  addSumCalculationNodeButtonRef: RefObject<HTMLDivElement>;
}

const NodesAside: FC<NodesAsideProps> = ({
  addFileDataNodeButtonRef,
  addSumCalculationNodeButtonRef,
}) => {
  const [, dragFileData] = useDrag(() => ({
    type: DraggableType.AddDataNode,
    item: {
      dataType: NodeDataType.File,
    },
  }));

  const [, dragCalculationSum] = useDrag(() => ({
    type: DraggableType.AddCalculationNode,
    item: { calculationType: CalculationType.Sum },
  }));
  return (
    <NodesAsideWrapper>
      <NodesAsideRow>
        <NodeButton
          dataType={NodeDataType.File}
          nodeType={NodeType.Data}
          ref={mergeRefs([addFileDataNodeButtonRef, dragFileData])}
        />
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeButton
          calculationType={CalculationType.Sum}
          nodeType={NodeType.Calculation}
          ref={mergeRefs([addSumCalculationNodeButtonRef, dragCalculationSum])}
        />
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
