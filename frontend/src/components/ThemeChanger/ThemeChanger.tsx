import React, { FC, useState } from "react";
import { ThemeProvider } from "styled-components";
import greyTheme from "../../styles/themes/greyTheme";
import blueTheme from "../../styles/themes/blueTheme";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import ThemePicker from "../common/ThemePicker";
import { ThemePickerBox } from "./ThemeChanger.components";
import { ThemeId, ThemeListItem } from "../../types/ThemeListItem";

const ThemeChanger: FC<ComponentWithChildren> = ({ children }) => {
  const themes: ThemeListItem[] = [
    { Id: ThemeId.Default, Theme: greyTheme },
    { Id: ThemeId.Blue, Theme: blueTheme },
  ];
  const [selectedTheme, setSelectedTheme] = useState<ThemeListItem>(
    themes.find((t) => t.Id === ThemeId.Default)!
  );

  return (
    <ThemeProvider theme={selectedTheme.Theme}>
      {children}
      <ThemePickerBox>
        <ThemePicker
          themes={themes}
          onThemeChange={setSelectedTheme}
          selectedTheme={selectedTheme}
        />
      </ThemePickerBox>
    </ThemeProvider>
  );
};

export default ThemeChanger;
