import { CalculationNode, CalculationType, NodeType } from "../../types/Node";
import { v4 } from "uuid";

export const createCalculationNode = (
  calculationType: CalculationType
): CalculationNode => ({
  id: v4(),
  type: NodeType.Calculation,
  calculationType,
});
