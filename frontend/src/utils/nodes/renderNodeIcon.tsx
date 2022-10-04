import { NodeDataType, NodeType, CalculationType } from "../../types/Node";
import { renderCalculationNodeIcon } from "./renderCalculationNodeIcon";
import { renderDataNodeIcon } from "./renderDataNodeIcon";

export type RenderNodeIconOptions = {
  dataType?: NodeDataType;
  calculationType?: CalculationType;
};

export const renderNodeIcon = (
  nodeType: NodeType,
  opts: RenderNodeIconOptions
) => {
  switch (nodeType) {
    case NodeType.Data:
      return opts.dataType ? renderDataNodeIcon(opts.dataType) : <></>;
    case NodeType.Calculation:
      return opts.calculationType ? (
        renderCalculationNodeIcon(opts.calculationType)
      ) : (
        <></>
      );
  }
};
