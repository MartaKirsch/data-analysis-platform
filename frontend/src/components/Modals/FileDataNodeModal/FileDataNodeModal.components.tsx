import styled from "styled-components";
import { modalButton } from "../../../styles/mixins";

export const UploadFileInputWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UploadFileInput = styled.input`
  opacity: 0;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;

  width: 100%;
  height: 100%;

  cursor: pointer;

  &:hover + button::after,
  &:focus + button::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;

export const UploadFileButton = styled.button`
  ${modalButton}
`;

export const UploadFileText = styled.span`
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weights.thin};

  margin-left: 10px;
`;

export const UploadRow = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-top: 56px;
`;
