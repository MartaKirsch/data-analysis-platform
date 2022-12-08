import defaultTheme from "./defaultTheme";

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
      },
      closeIconFill: "black",
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
  dimensions: {
    iconButton: {
      xs: "40px",
      sm: "43px",
      md: "50px",
      lg: "53px",
    },
    icon: {
      width: "40px",
      height: "40px",
    },
    node: {
      width: "70px",
      height: "70px",
    },
    aside: {
      width: "364px",
    },
    connectionWidth: "6px",
  },
  fonts: {
    sizes: { s: "20px", base: "22px", m: "24px" },
    weights: { thin: 400, normal: 600, bold: 800 },
    families: { normal: "'Montserrat', sans-serif" },
  },
};

const theme = { ...defaultTheme, ...highContrastTheme };

export default theme;
