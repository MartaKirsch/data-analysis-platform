import FileDataNodeModal from "../../components/Modals/DataNodeModals/FileDataNodeModal";
import { NodeDataType } from "../../types/Node";

export const renderDataModal = (
  dataType: NodeDataType,
  onCloseModal: () => void
) => {
  switch (dataType) {
    case NodeDataType.File:
      return <FileDataNodeModal onClose={onCloseModal} />;
    default:
      return <></>;
  }
};
