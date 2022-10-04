import React, { forwardRef } from "react";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import { NodeDataType, NodeType, CalculationType } from "../../types/Node";
import { renderNodeIcon } from "../../utils/nodes/renderNodeIcon";
import { NodeBase } from "./Node";

interface NodeButtonProps extends ComponentWithChildren {
  nodeType: NodeType;
  dataType?: NodeDataType;
  calculationType?: CalculationType;
}

const NodeButton = forwardRef<HTMLDivElement, NodeButtonProps>(
  ({ nodeType, dataType, calculationType }, ref) => {
    return (
      <NodeBase nodeType={nodeType} ref={ref}>
        {renderNodeIcon(nodeType, { dataType, calculationType })}
      </NodeBase>
    );
  }
);

export default NodeButton;
