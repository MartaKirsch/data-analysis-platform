import defaultTheme from "./defaultTheme";

const greyTheme = {
  colors: {
    background: "#363732",
    secondary: "#53D8FB",
    aside: {
      background: "#2C2D28",
    },
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
  },
};

const theme = { ...defaultTheme, ...greyTheme };

export default theme;

export type ColorsThemeType = typeof greyTheme;
