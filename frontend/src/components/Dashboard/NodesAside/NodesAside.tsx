import React, { FC, RefObject } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodesAsideRow, NodesAsideWrapper } from "./NodesAside.components";
import { ReactComponent as FileIcon } from "../../../img/nodeIcons/file.svg";
import { ReactComponent as SumIcon } from "../../../img/nodeIcons/sum.svg";
import NodeButton from "../../Nodes/NodeButton";
import { CalculationType, NodeType } from "../../../types/Node";
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
    type: DraggableType.AddFileDataNode,
  }));

  const [, dragCalculationSum] = useDrag(() => ({
    type: DraggableType.AddCalculationNode,
    item: { calculationType: CalculationType.Sum },
  }));
  return (
    <NodesAsideWrapper>
      <NodesAsideRow>
        <NodeButton
          icon={<FileIcon />}
          nodeType={NodeType.Data}
          ref={mergeRefs([addFileDataNodeButtonRef, dragFileData])}
        />
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeButton
          icon={<SumIcon />}
          nodeType={NodeType.Calculation}
          ref={mergeRefs([addSumCalculationNodeButtonRef, dragCalculationSum])}
        />
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
