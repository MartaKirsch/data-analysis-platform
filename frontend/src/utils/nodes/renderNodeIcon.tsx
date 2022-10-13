import {
  NodeDataType,
  NodeType,
  CalculationType,
  ResultType,
} from "../../types/Node";
import { renderCalculationNodeIcon } from "./renderCalculationNodeIcon";
import { renderDataNodeIcon } from "./renderDataNodeIcon";
import { renderResultNodeIcon } from "./renderResultNodeIcon";

export type RenderNodeIconOptions = {
  dataType?: NodeDataType;
  calculationType?: CalculationType;
  resultType?: ResultType;
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
    case NodeType.Result:
      return opts.resultType ? renderResultNodeIcon(opts.resultType) : <></>;
  }
};
