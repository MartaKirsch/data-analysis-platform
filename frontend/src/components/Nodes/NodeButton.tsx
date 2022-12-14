import React, { forwardRef } from "react";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import {
  NodeDataType,
  NodeType,
  CalculationType,
  ResultType,
} from "../../types/Node";
import { renderNodeIcon } from "../../utils/nodes/renderNodeIcon";
import { NodeBase } from "./Node/Node.components";

interface NodeButtonProps extends ComponentWithChildren {
  nodeType: NodeType;
  dataType?: NodeDataType;
  calculationType?: CalculationType;
  resultType?: ResultType;
  dataId?: string;
}

const NodeButton = forwardRef<HTMLDivElement, NodeButtonProps>(
  ({ nodeType, dataType, calculationType, resultType, dataId }, ref) => {
    return (
      <NodeBase nodeType={nodeType} ref={ref} data-id={dataId}>
        {renderNodeIcon(nodeType, { dataType, calculationType, resultType })}
      </NodeBase>
    );
  }
);

export default NodeButton;
