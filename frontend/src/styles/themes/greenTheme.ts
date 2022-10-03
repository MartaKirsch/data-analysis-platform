import defaultTheme from "./defaultTheme";

const greenTheme = {
  colors: {
    background: "#132A13",
    secondary: "#4F772D",
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
  },
};

const theme = { ...defaultTheme, ...greenTheme };

export default theme;

export type ColorsThemeType = typeof greenTheme;
