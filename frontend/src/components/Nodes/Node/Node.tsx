import React, { forwardRef } from "react";
import { ComponentWithChildren } from "../../../types/ComponentWithChildren";
import { NodeType } from "../../../types/Node";
import { NodeWrapper, ErrorIconWrapper } from "./Node.components";
import ErrorIcon from "../../common/ErrorIcon";

interface NodeProps extends ComponentWithChildren {
  left: number;
  top: number;
  nodeType: NodeType;
  modal: JSX.Element;
  isModalOpen: boolean;
  onNodeClick: () => void;
  error?: string;
}

const Node = forwardRef<HTMLDivElement, NodeProps>(
  (
    { top, left, nodeType, modal, children, isModalOpen, onNodeClick, error },
    ref
  ) => {
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
          {error && (
            <ErrorIconWrapper>
              <ErrorIcon />
            </ErrorIconWrapper>
          )}
          {children}
        </NodeWrapper>
      </>
    );
  }
);

export default Node;
