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
    errorText: "#E47140",
    errorIcon: { background: "#E47140", fill: "#FFFFFF" },
    node: {
      data: { background: "#BCFC9A", backgroundHover: "#ABEB89" },
      calculation: { background: "#53D8FB", backgroundHover: "#42C7EA" },
      result: { background: "#D4AFB9", backgroundHover: "#C39EA8" },
      fill: "#000000",
      connection: "#F8FFA8",
    },
    tippy: { bg: "#ffa099", text: "black" },
    modal: {
      button: {
        background: "white",
        text: "black",
        backgroundHover: "#F0F0F0",
        backgroundDisabled: "#BBBBBB",
      },
      closeIconFill: "#363732",
      info: { background: "white", text: "black", accent: "#C1C1C1" },
    },
    sheetNameButton: {
      activeBackground: "#FFFFFF",
      notActiveBackground: "#9BD67C",
      text: "black",
    },
    editableTable: {
      background: "#FFFFFF",
      cellSeparatorColor: "#363732",
      text: "black",
    },
  },
};

const theme = { ...defaultTheme, ...greyTheme };

export default theme;

export type ColorsThemeType = typeof greyTheme;
