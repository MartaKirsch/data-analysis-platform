import styled from "styled-components";

export const ModalWrapper = styled.div<{ backgroundColor: string }>`
  position: absolute;
  top: 50%;
  left: 50%;

  padding: 35px;
  border-radius: 15px;

  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  height: 20px;
  width: 20px;

  svg {
    height: 100%;
    width: 100%;
  }

  background-color: none;
`;
