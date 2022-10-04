import styled from "styled-components";
import { NodeType } from "../../types/Node";

export const NodeBase = styled.div<{
  nodeType: NodeType;
}>`
  height: ${({ theme }) => theme.dimensions.node.height};
  width: ${({ theme }) => theme.dimensions.node.width};

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme, nodeType }) => {
    switch (nodeType) {
      case NodeType.Data:
        return theme.colors.node.data.background;
      case NodeType.Calculation:
        return theme.colors.node.calculation.background;
      case NodeType.Visualization:
        return theme.colors.node.visualization.background;
    }
  }};

  border-radius: 50%;

  cursor: move;

  svg {
    height: ${({ theme }) => theme.dimensions.icon.height};
    width: ${({ theme }) => theme.dimensions.icon.width};
    fill: ${({ theme }) => theme.colors.node.fill};
  }
`;

export const Node = styled(NodeBase)<{ left: number; top: number }>`
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  position: absolute;
`;
