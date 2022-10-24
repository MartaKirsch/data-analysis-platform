import React, { FC, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import greyTheme from "../../styles/themes/greyTheme";
import blueTheme from "../../styles/themes/blueTheme";
import { ComponentWithChildren } from "../../types/ComponentWithChildren";
import ThemePicker from "../common/ThemePicker";
import { ThemePickerBox } from "./ThemeChanger.components";
import { ThemeId, ThemeListItem } from "../../types/ThemeListItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const themes: ThemeListItem[] = [
  { Id: ThemeId.Default, Theme: greyTheme },
  { Id: ThemeId.Blue, Theme: blueTheme },
];

const ThemeChanger: FC<ComponentWithChildren> = ({ children }) => {
  const [selectedThemeId, setSelectedThemeId] = useLocalStorage<string>({
    initValue: ThemeId.Default,
    key: "SELECTED_THEME",
  });

  const selectedTheme = useMemo(
    () => themes.find((t) => t.Id === selectedThemeId)!,
    [selectedThemeId]
  );

  return (
    <ThemeProvider theme={selectedTheme.Theme}>
      {children}
      <ThemePickerBox>
        <ThemePicker
          themes={themes}
          onThemeChange={setSelectedThemeId}
          selectedTheme={selectedTheme}
        />
      </ThemePickerBox>
    </ThemeProvider>
  );
};

export default ThemeChanger;
