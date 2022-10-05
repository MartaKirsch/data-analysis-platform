import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { useBoardContext } from "../../../context/useBoardContext";
import {
  getNodeBackgroundColor,
  getNodeBackgroundHoverColor,
} from "../../../styles/mixins";
import { NodeType } from "../../../types/Node";
import Modal from "../../common/Modal/Modal";
import {
  UploadFileButton,
  UploadFileInput,
  UploadFileInputWrapper,
  UploadFileText,
} from "./FileDataNodeModal.components";

interface FileDataNodeModalProps {
  onClose: () => void;
  nodeId: string;
}

type FormData = { File?: FileList };

const FileDataNodeModal: FC<FileDataNodeModalProps> = ({ onClose, nodeId }) => {
  const { dataNodes, setNodeData } = useBoardContext();

  const dataNode = useMemo(
    () => dataNodes.find((dn) => dn.id === nodeId)!,
    [dataNodes, nodeId]
  );

  const theme = useTheme();
  const nodeType = NodeType.Data;
  const acceptedMimeTypes = [".csv"];

  const { register, watch } = useForm<FormData>();

  const handleFileChanges = useCallback(
    (fileList?: FileList) => {
      if (!fileList) return;
      setNodeData(nodeId, fileList.item(0) ?? undefined);
    },
    [nodeId, setNodeData]
  );

  const file = watch("File");

  useEffect(() => {
    handleFileChanges(file);
  }, [file, handleFileChanges]);

  return (
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
    </Modal>
  );
};

export default FileDataNodeModal;
