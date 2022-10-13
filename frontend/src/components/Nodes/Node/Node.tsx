import React, { forwardRef } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodeType } from "../../../types/Node";
import { NodeWrapper } from "./Node.components";

interface NodeProps extends ComponentWithChildren {
  left: number;
  top: number;
  nodeType: NodeType;
  modal: JSX.Element;
  isModalOpen: boolean;
  onNodeClick: () => void;
}

const Node = forwardRef<HTMLDivElement, NodeProps>(
  ({ top, left, nodeType, modal, children, isModalOpen, onNodeClick }, ref) => {
    return (
      <>
        {isModalOpen && modal}
        <NodeWrapper
          left={left}
          top={top}
          nodeType={nodeType}
          ref={ref}
          onClick={onNodeClick}
        >
          {children}
        </NodeWrapper>
      </>
    );
  }
);

export default Node;
