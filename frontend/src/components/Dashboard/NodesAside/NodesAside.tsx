import React, { FC, useRef } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodesAsideRow, NodesAsideWrapper } from "./NodesAside.components";
import NodeButton from "../../Nodes/NodeButton";
import { CalculationType, NodeDataType, NodeType } from "../../../types/Node";
import { useDrag } from "react-dnd";
import { DraggableType } from "../../../types/DraggableType";
import { mergeRefs } from "react-merge-refs";

interface NodesAsideProps extends ComponentWithChildren {}

const NodesAside: FC<NodesAsideProps> = () => {
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