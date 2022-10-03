import styled from "styled-components";

export const Node = styled.div<{ left: number; top: number; bgColor: string }>`
  height: 50px;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ bgColor }) => bgColor};

  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  position: absolute;

  border-radius: 50%;

  cursor: move;
`;
