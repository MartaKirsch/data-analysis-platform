import { ColorsThemeType } from "./greyTheme";

const defaultTheme = {
  dimensions: {
    iconButton: {
      sm: "40px",
      md: "43px",
      lg: "50px",
    },
    icon: {
      width: "30px",
      height: "30px",
    },
    node: {
      width: "50px",
      height: "50px",
    },
  },
};

export default defaultTheme;

export type DefaultThemeType = typeof defaultTheme;

export type ThemeType = DefaultThemeType & ColorsThemeType;
