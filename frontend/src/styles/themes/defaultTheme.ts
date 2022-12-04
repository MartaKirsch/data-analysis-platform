import { ColorsThemeType } from "./greyTheme";

const defaultTheme = {
  dimensions: {
    iconButton: {
      xs: "30px",
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
    weights: { thin: 300, normal: 400, bold: 600 },
    families: { normal: "'Montserrat', sans-serif" },
  },
};

export default defaultTheme;

export type DefaultThemeType = typeof defaultTheme;

export type ThemeType = DefaultThemeType & ColorsThemeType;
