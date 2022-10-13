import styled from "styled-components";
import { calculateLength } from "../../../utils/calculateLength";

export const ConnectionsBoardWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

export const ConnectionBar = styled.div<{
  top: number;
  left: number;
  bottom: number;
  right: number;
  rotate: number;
}>`
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  position: absolute;

  transform-origin: 100% 0;
  transform: rotate(${({ rotate }) => rotate}rad);

  width: 4px;
  height: ${({ top, bottom, left, right }) =>
    calculateLength(left, top, right, bottom)}px;

  background-color: ${({ theme }) => theme.colors.node.connection};

  cursor: pointer;
`;
