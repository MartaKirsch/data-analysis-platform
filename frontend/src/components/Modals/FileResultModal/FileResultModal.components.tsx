import styled from "styled-components";
import { modalButton } from "../../../styles/mixins";

export const FileResultModalLink = styled.a`
  ${modalButton}
  margin-top: 42px;
`;

export const FileResultModalBody = styled.div`
  max-height: 70vh;

  overflow: auto;
`;

export const FileResultModalInnerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
`;

export const FileResultModalFilename = styled.span``;

export const FileResultModalFileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-top: 42px;

  & > button:last-child {
    margin-left: 10px;
  }
`;
