import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { useBoardContext } from "../../../context/useBoardContext";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { DataNode, DataNodeError, NodeType } from "../../../types/Node";
import Modal from "../../common/Modal/Modal";
import {
  UploadFileButton,
  UploadFileInput,
  UploadFileInputWrapper,
  UploadFileText,
  UploadRow,
} from "./FileDataNodeModal.components";
import IconButton from "../../common/IconButton";
import { ReactComponent as EyeIcon } from "../../../img/eye.svg";
import EditFileModal from "../EditFileModal";
import ErrorMessageBar from "../../common/ErrorMessageBar";

interface FileDataNodeModalProps {
  onClose: () => void;
  nodeId: string;
  errors: DataNodeError[];
}

type FormData = { File?: FileList };

const FileDataNodeModal: FC<FileDataNodeModalProps> = ({
  onClose,
  nodeId,
  errors,
}) => {
  const { nodes, setNodeData } = useBoardContext();
  const [isEditFileModalOpen, setIsEditFileModalOpen] = useState(false);

  const dataNode = useMemo(
    () => nodes.find((node) => node.id === nodeId)! as DataNode,
    [nodes, nodeId]
  );

  const theme = useTheme();
  const nodeType = NodeType.Data;
  const acceptedMimeTypes = [".csv"];

  const { register, watch } = useForm<FormData>();

  const handleFileChanges = useCallback(
    (fileList?: FileList) => {
      if (!fileList || !fileList.item(0)) return;
      setNodeData(nodeId, fileList.item(0)!);
    },
    [nodeId, setNodeData]
  );

  const file = watch("File");

  useEffect(() => {
    handleFileChanges(file);
  }, [file, handleFileChanges]);

  return (
    <>
      <Modal
        backgroundColor={getNodeBackgroundColor({
          theme,
          nodeType,
        })}
        onClose={onClose}
        modalHeader={{
          text: "Upload data file",
          backgroundColor: getNodeBackgroundHoverColor({ theme, nodeType }),
        }}
      >
        <>
          {errors &&
            errors.map((error) => (
              <ErrorMessageBar
                key={`error-${error.calcNodeId}`}
                message={error.message}
              />
            ))}
          <UploadRow>
            <UploadFileInputWrapper>
              <UploadFileInput
                type="file"
                accept={acceptedMimeTypes.join(",")}
                {...register("File")}
              />
              <UploadFileButton>Upload</UploadFileButton>
              <UploadFileText>
                {dataNode.data
                  ? (dataNode.data as File).name
                  : "Click here to browse files..."}
              </UploadFileText>
            </UploadFileInputWrapper>
            {dataNode.data && (
              <IconButton
                icon={<EyeIcon />}
                shouldResize
                size="sm"
                onClick={() => setIsEditFileModalOpen(true)}
              />
            )}
          </UploadRow>
        </>
      </Modal>
      {isEditFileModalOpen && (
        <EditFileModal
          onClose={() => setIsEditFileModalOpen(false)}
          file={dataNode.data as File}
          nodeType={nodeType}
          headerText="View uploaded file"
        />
      )}
    </>
  );
};

export default FileDataNodeModal;
