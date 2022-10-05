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
    aside: {
      width: "364px",
    },
  },
  fonts: {
    sizes: { s: "16px", base: "18px", m: "20px" },
    weights: { thin: 300, normal: 400 },
  },
};

export default defaultTheme;

export type DefaultThemeType = typeof defaultTheme;

export type ThemeType = DefaultThemeType & ColorsThemeType;
