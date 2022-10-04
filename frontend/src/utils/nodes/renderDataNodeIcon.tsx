import { ReactComponent as FileIcon } from "../../img/nodeIcons/file.svg";
import { NodeDataType } from "../../types/Node";

export const renderDataNodeIcon = (dataType: NodeDataType) => {
  switch (dataType) {
    case NodeDataType.File:
      return <FileIcon />;
  }
};
