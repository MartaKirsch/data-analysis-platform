import { ThemeType } from "../styles/themes/defaultTheme";

export enum ThemeId {
  Default = "DEFAULT",
  Blue = "BLUE",
}

export type ThemeListItem = {
  Id: ThemeId;
  Theme: ThemeType;
};
