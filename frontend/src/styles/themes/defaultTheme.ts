import { ColorsThemeType } from "./greenTheme";

const defaultTheme = {
  dimensions: {
    iconButton: {
      sm: "40px",
      md: "43px",
      lg: "50px",
    },
  },
};

export default defaultTheme;

export type DefaultThemeType = typeof defaultTheme;

export type ThemeType = DefaultThemeType & ColorsThemeType;
