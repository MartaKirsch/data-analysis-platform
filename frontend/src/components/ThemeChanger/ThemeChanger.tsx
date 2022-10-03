import React, { FC, useState } from "react";
import { ThemeProvider } from "styled-components";
import greyTheme from "../../styles/themes/greyTheme";
import blueTheme from "../../styles/themes/blueTheme";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import ThemePicker from "../common/ThemePicker";
import { ThemePickerBox } from "./ThemeChanger.components";

const ThemeChanger: FC<ComponentWithChildren> = ({ children }) => {
  const themes = [greyTheme, blueTheme];
  const [selectedTheme, setSelectedTheme] = useState(greyTheme);

  return (
    <ThemeProvider theme={selectedTheme}>
      {children}
      <ThemePickerBox>
        <ThemePicker themes={themes} onThemeChange={setSelectedTheme} />
      </ThemePickerBox>
    </ThemeProvider>
  );
};

export default ThemeChanger;
