import { DefaultTheme, ThemeProps } from "styled-components";
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
