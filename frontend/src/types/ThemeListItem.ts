import { ThemeType } from "../styles/themes/defaultTheme";

export enum ThemeId {
  Default = "DEFAULT",
  Blue = "BLUE",
  HighContrast = "HIGH_CONTRAST",
  Greyscale = "GREYSCALE",
}

export type ThemeListItem = {
  Id: ThemeId;
  Theme: ThemeType;
};
