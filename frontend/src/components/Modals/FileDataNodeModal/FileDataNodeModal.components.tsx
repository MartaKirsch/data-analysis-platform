import styled from "styled-components";

export const UploadFileInputWrapper = styled.div`
  margin-top: 56px;

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

  &:hover + button::after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;

export const UploadFileButton = styled.button`
  position: relative;
  z-index: 1;

  background-color: ${({ theme }) => theme.colors.modal.button.background};
  color: ${({ theme }) => theme.colors.modal.button.text};

  padding: 10px 30px;

  border-radius: 15px;
  overflow: hidden;

  font-size: ${({ theme }) => theme.fonts.sizes.s};

  &::after {
    content: "";

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    background-color: ${({ theme }) =>
      theme.colors.modal.button.backgroundHover};

    transform: scaleX(0);
    transition: transform 0.3s ease-out;
    transform-origin: 100% 50%;
  }
`;

export const UploadFileText = styled.span`
  font-style: italic;
  font-weight: ${({ theme }) => theme.fonts.weights.thin};

  margin-left: 10px;
`;
