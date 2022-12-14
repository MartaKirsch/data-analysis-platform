import { defaultLargeTheme } from "./defaultTheme";

const highContrastTheme = {
  colors: {
    background: "#21211f",
    secondary: "#fffb00",
    aside: {
      background: "#10100e",
      rowSeparator: "#FFFFFF",
    },
    iconButton: {
      background: "#FFFFFF",
      fill: "#000000",
    },
    errorText: "#ff0000",
    errorIcon: { background: "#ff0000", fill: "#FFFFFF" },
    node: {
      data: { background: "#fffb00", backgroundHover: "#eeea00" },
      calculation: { background: "#63ed00", backgroundHover: "#52dc00" },
      result: { background: "#00fffb", backgroundHover: "#00eeea" },
      fill: "#000000",
      connection: "#FFFFFF",
    },
    tippy: { bg: "#FFFFFF", text: "black" },
    modal: {
      button: {
        background: "black",
        text: "white",
        backgroundHover: "#21211f",
        backgroundDisabled: "#333333",
      },
      closeIconFill: "#FFFFFF",
      info: { background: "black", text: "white", accent: "#21211f" },
    },
    sheetNameButton: {
      activeBackground: "black",
      notActiveBackground: "#fffb00",
      text: "#FFFFFF",
    },
    editableTable: {
      background: "black",
      cellSeparatorColor: "#FFFFFF",
      text: "#FFFFFF",
    },
  },
};

const theme = { ...defaultLargeTheme, ...highContrastTheme };

export default theme;
