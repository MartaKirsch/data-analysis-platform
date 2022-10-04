import defaultTheme from "./defaultTheme";
import { ColorsThemeType } from "./greyTheme";

const blueTheme: ColorsThemeType = {
  colors: {
    background: "#2D3142",
    secondary: "#EF8354",
    aside: {
      background: "#1C2031",
      rowSeparator: "#C6C6C6",
    },
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
    node: {
      data: { background: "#EF8354" },
      calculation: { background: "#53D8FB" },
      visualization: { background: "#D4AFB9" },
    },
  },
} as const;

const theme = { ...defaultTheme, ...blueTheme };

export default theme;
