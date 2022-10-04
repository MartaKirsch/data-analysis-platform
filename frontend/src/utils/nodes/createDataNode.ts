import { DataNode, NodeDataType, NodeType } from "../../types/Node";
import { v4 } from "uuid";

export const createDataNode = (dataType?: NodeDataType): DataNode => ({
  id: v4(),
  type: NodeType.Data,
  dataType: dataType || NodeDataType.File,
  data: undefined,
});
