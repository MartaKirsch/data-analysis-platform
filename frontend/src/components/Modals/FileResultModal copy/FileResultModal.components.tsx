import styled from "styled-components";
import { modalButton } from "../../../styles/mixins";

export const FileResultModalLink = styled.a`
  ${modalButton}
  margin-top: 42px;
`;

export const FileResultModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  width: 100%;
  max-height: 70vh;

  overflow: auto;
`;

export const FileResultModalFilename = styled.span`
  margin-top: 42px;
`;
