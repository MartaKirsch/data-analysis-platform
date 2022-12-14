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
    errorText: "#CD1919",
    errorIcon: { background: "#CD1919", fill: "#FFFFFF" },
    node: {
      data: { background: "#EF8354", backgroundHover: "#DE7243" },
      calculation: { background: "#81B29A", backgroundHover: "#70A189" },
      result: { background: "#C1666B", backgroundHover: "#B0555A" },
      fill: "#FFFFFF",
      connection: "#C7E5F3",
    },
    modal: {
      button: {
        background: "white",
        text: "black",
        backgroundHover: "#EEEEEE",
        backgroundDisabled: "#BBBBBB",
      },
      closeIconFill: "white",
    },
    tippy: { bg: "#5893b0", text: "white" },
    sheetNameButton: {
      activeBackground: "#DCE1E9",
      notActiveBackground: "#CA6438",
    },
    editableTable: {
      background: "#DCE1E9",
      cellSeparatorColor: "#363732",
    },
  },
} as const;

const theme = { ...defaultTheme, ...blueTheme };

export default theme;
