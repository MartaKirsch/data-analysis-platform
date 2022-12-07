import FileDataNodeModal from "../../components/Modals/FileDataNodeModal";
import { DataNodeError, NodeDataType } from "../../types/Node";

export const renderDataModal = (
  dataType: NodeDataType,
  onCloseModal: () => void,
  nodeId: string,
  errors: DataNodeError[]
) => {
  switch (dataType) {
    case NodeDataType.File:
      return (
        <FileDataNodeModal
          onClose={onCloseModal}
          nodeId={nodeId}
          errors={errors}
        />
      );
    default:
      return <></>;
  }
};
