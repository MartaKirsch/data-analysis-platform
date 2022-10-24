import { NodeType, ResultNode, ResultType } from "../../types/Node";
import { v4 } from "uuid";

export const createResultNode = (resultType: ResultType): ResultNode => ({
  id: v4(),
  type: NodeType.Result,
  resultType: resultType,
});
