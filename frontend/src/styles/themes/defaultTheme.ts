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
    connectionWidth: "4px",
  },
  fonts: {
    sizes: { s: "16px", base: "18px", m: "20px" },
    weights: { thin: 300, normal: 400, bold: 600 },
    families: { normal: "'Montserrat', sans-serif" },
  },
};

export const defaultLargeTheme = {
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

export default defaultTheme;

export type DefaultThemeType = typeof defaultTheme;

export type ThemeType = DefaultThemeType & ColorsThemeType;
