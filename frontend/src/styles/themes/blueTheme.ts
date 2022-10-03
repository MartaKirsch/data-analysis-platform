import defaultTheme from "./defaultTheme";
import { ColorsThemeType } from "./greyTheme";

const blueTheme: ColorsThemeType = {
  colors: {
    background: "#2D3142",
    secondary: "#EF8354",
    aside: {
      background: "#2C2D28",
    },
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
  },
} as const;

const theme = { ...defaultTheme, ...blueTheme };

export default theme;
