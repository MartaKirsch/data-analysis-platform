import defaultTheme from "./defaultTheme";
import { ColorsThemeType } from "./greenTheme";

const blueTheme: ColorsThemeType = {
  colors: {
    background: "#2D3142",
    secondary: "#EF8354",
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
  },
} as const;

const theme = { ...defaultTheme, ...blueTheme };

export default theme;
