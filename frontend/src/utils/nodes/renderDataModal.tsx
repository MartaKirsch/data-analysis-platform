import FileDataNodeModal from "../../components/Modals/FileDataNodeModal";
import { NodeDataType } from "../../types/Node";

export const renderDataModal = (
  dataType: NodeDataType,
  onCloseModal: () => void,
  nodeId: string
) => {
  switch (dataType) {
    case NodeDataType.File:
      return <FileDataNodeModal onClose={onCloseModal} nodeId={nodeId} />;
    default:
      return <></>;
  }
};
