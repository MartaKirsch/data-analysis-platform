import { css, DefaultTheme, ThemeProps } from "styled-components";
import { NodeType } from "../types/Node";

export const getNodeBackgroundColor = ({
  theme,
  nodeType,
}: ThemeProps<DefaultTheme> & { nodeType: NodeType }) => {
  switch (nodeType) {
    case NodeType.Data:
      return theme.colors.node.data.background;
    case NodeType.Calculation:
      return theme.colors.node.calculation.background;
    case NodeType.Result:
      return theme.colors.node.result.background;
  }
};

export const getNodeBackgroundHoverColor = ({
  theme,
  nodeType,
}: ThemeProps<DefaultTheme> & { nodeType: NodeType }) => {
  switch (nodeType) {
    case NodeType.Data:
      return theme.colors.node.data.backgroundHover;
    case NodeType.Calculation:
      return theme.colors.node.calculation.backgroundHover;
    case NodeType.Result:
      return theme.colors.node.result.backgroundHover;
  }
};

export const modalButton = css`
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
