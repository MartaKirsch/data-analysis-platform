import defaultTheme from "./defaultTheme";

const greyTheme = {
  colors: {
    background: "#363732",
    secondary: "#53D8FB",
    aside: {
      background: "#2C2D28",
      rowSeparator: "#C6C6C6",
    },
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
    node: {
      data: { background: "#BCFC9A", backgroundHover: "#ABEB89" },
      calculation: { background: "#53D8FB", backgroundHover: "#42C7EA" },
      visualization: { background: "#D4AFB9", backgroundHover: "#C39EA8" },
      fill: "#000000",
      connection: "orange",
    },
  },
};

const theme = { ...defaultTheme, ...greyTheme };

export default theme;

export type ColorsThemeType = typeof greyTheme;
