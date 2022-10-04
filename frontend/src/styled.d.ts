import "styled-components";
import { ThemeType } from "./styles/themes/defaultTheme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
