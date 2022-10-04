import React, { FC } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodesAsideRow, NodesAsideWrapper } from "./NodesAside.components";
import { ReactComponent as FileIcon } from "../../../img/nodeIcons/file.svg";
import { ReactComponent as SumIcon } from "../../../img/nodeIcons/sum.svg";
import NodeButton from "../../Nodes/NodeButton";
import { NodeType } from "../../../types/Node";

interface NodesAsideProps extends ComponentWithChildren {}

const NodesAside: FC<NodesAsideProps> = () => {
  return (
    <NodesAsideWrapper>
      <NodesAsideRow>
        <NodeButton icon={<FileIcon />} nodeType={NodeType.Data} />
      </NodesAsideRow>
      <NodesAsideRow>
        <NodeButton icon={<SumIcon />} nodeType={NodeType.Calculation} />
      </NodesAsideRow>
    </NodesAsideWrapper>
  );
};
export default NodesAside;
