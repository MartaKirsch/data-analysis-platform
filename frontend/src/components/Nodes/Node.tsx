import styled from "styled-components";
import { getNodeBackgroundColor } from "../../styles/mixins";
import { NodeType } from "../../types/Node";

export const NodeBase = styled.div<{
  nodeType: NodeType;
}>`
  height: ${({ theme }) => theme.dimensions.node.height};
  width: ${({ theme }) => theme.dimensions.node.width};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, nodeType }) =>
    getNodeBackgroundColor({ theme, nodeType })};

  border-radius: 50%;

  cursor: move;

  position: relative;
  z-index: 1;

  svg {
    height: ${({ theme }) => theme.dimensions.icon.height};
    width: ${({ theme }) => theme.dimensions.icon.width};
    fill: ${({ theme }) => theme.colors.node.fill};

    transform-origin: 50% 50%;
    transition: transform 0.2s ease-out;
  }

  &:hover svg {
    transform: scale(0.85);
  }

  &:hover::after {
    transform: scale(1);
  }

  &::after {
    content: "";

    border-radius: 50%;
    height: 100%;
    width: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    transform: scale(0);
    transition: transform 0.2s ease-out;
    transform-origin: 50% 50%;

    background-color: ${({ theme, nodeType }) => {
      switch (nodeType) {
        case NodeType.Data:
          return theme.colors.node.data.backgroundHover;
        case NodeType.Calculation:
          return theme.colors.node.calculation.backgroundHover;
        case NodeType.Result:
          return theme.colors.node.result.backgroundHover;
      }
    }};
  }
`;

export const Node = styled(NodeBase)<{ left: number; top: number }>`
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  position: absolute;
`;
