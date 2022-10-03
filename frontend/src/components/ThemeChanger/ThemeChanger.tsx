import React, { FC, useState } from "react";
import { ThemeProvider } from "styled-components";
import greenTheme from "../../styles/themes/greenTheme";
import blueTheme from "../../styles/themes/blueTheme";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import ThemePicker from "../common/ThemePicker";
import { ThemePickerBox } from "./ThemeChanger.components";

const ThemeChanger: FC<ComponentWithChildren> = ({ children }) => {
  const themes = [greenTheme, blueTheme];
  const [selectedTheme, setSelectedTheme] = useState(greenTheme);

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
