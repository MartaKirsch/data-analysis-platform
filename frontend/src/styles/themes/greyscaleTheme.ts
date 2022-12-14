import { defaultLargeTheme } from "./defaultTheme";

const greyscaleTheme = {
  colors: {
    background: "#21211f",
    secondary: "#ADB5BD",
    aside: {
      background: "#212529",
      rowSeparator: "#FFFFFF",
    },
    iconButton: {
      background: "#FFFFFF",
      fill: "black",
    },
    errorText: "#21211f",
    errorIcon: { background: "#343A40", fill: "#FFFFFF" },
    node: {
      data: { background: "#E9ECEF", backgroundHover: "#D8DBDE" },
      calculation: { background: "#AD9F9B", backgroundHover: "#9C8E8A" },
      result: { background: "#726A68", backgroundHover: "#615957" },
      fill: "black",
      connection: "#FFFFFF",
    },
    tippy: { bg: "black", text: "#FFFFFF" },
    modal: {
      button: {
        background: "black",
        text: "white",
        backgroundHover: "#21211f",
      },
      closeIconFill: "#21211f",
      info: { background: "#E9ECEF", text: "#21211f", accent: "#C1C1C1" },
    },
    sheetNameButton: {
      activeBackground: "#21211f",
      notActiveBackground: "#E9ECEF",
      text: "#FFFFFF",
    },
    editableTable: {
      background: "#21211f",
      cellSeparatorColor: "#FFFFFF",
      text: "#FFFFFF",
    },
  },
};

const theme = { ...defaultLargeTheme, ...greyscaleTheme };

export default theme;
