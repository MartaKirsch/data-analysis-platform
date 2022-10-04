import React, { forwardRef } from "react";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { NodeType } from "../../types/Node";
import { NodeBase } from "./Node";

interface NodeButtonProps extends ComponentWithChildren {
  nodeType: NodeType;
  icon: JSX.Element;
}

const NodeButton = forwardRef<HTMLDivElement, NodeButtonProps>(
  ({ nodeType, icon }, ref) => {
    return (
      <NodeBase nodeType={nodeType} ref={ref}>
        {icon}
      </NodeBase>
    );
  }
);

export default NodeButton;
