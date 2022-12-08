import React, { FC, useMemo, useState } from "react";
import IconButton from "../IconButton";
import {
  ArrowWrapper,
  ThemeButtonWrapper,
  ThemePickerWrapper,
  ThemesWrapper,
  PaletteButtonWrapper,
} from "./ThemePicker.components";
import { ReactComponent as ColorPaletteIcon } from "../../../img/colorPalette.svg";
import { ReactComponent as LeftArrowIcon } from "../../../img/leftArrow.svg";
import { ReactComponent as DownArrowIcon } from "../../../img/downArrow.svg";
import ThemeIcon from "../ThemeIcon";
import { usePagination } from "../../../hooks/usePagination";
import { ThemeListItem } from "../../../types/ThemeListItem";
import NodeTippy from "../NodeTippy";

type ThemePickerProps = {
  selectedTheme: ThemeListItem;
  themes: ThemeListItem[];
  onThemeChange: (themeId: string) => void;
};

const ThemePicker: FC<ThemePickerProps> = ({
  themes,
  onThemeChange,
  selectedTheme,
}) => {
  const [areThemesVisible, setAreThemesVisible] = useState(false);

  const buttons = useMemo(
    () =>
      themes.map((theme, i) => (
        <ThemeButtonWrapper index={i % 3} key={i}>
          <IconButton
            icon={
              <ThemeIcon
                $primaryColor={theme.Theme.colors.background}
                $secondaryColor={theme.Theme.colors.secondary}
                $isSelected={theme.Id === selectedTheme.Id}
              />
            }
            size="sm"
            onClick={() => onThemeChange(theme.Id)}
          />
        </ThemeButtonWrapper>
      )),
    [themes, selectedTheme, onThemeChange]
  );

  const { currentPage, canGoPrevPage, goPrevPage, canGoNextPage, goNextPage } =
    usePagination({
      items: buttons,
      pageSize: 3,
    });

  return (
    <ThemePickerWrapper>
      {areThemesVisible && (
        <ThemesWrapper>
          {canGoPrevPage && areThemesVisible && (
            <ArrowWrapper direction="left">
              <LeftArrowIcon onClick={goPrevPage} />
            </ArrowWrapper>
          )}
          {currentPage}
          {canGoNextPage && areThemesVisible && (
            <ArrowWrapper direction="down">
              <DownArrowIcon onClick={goNextPage} />
            </ArrowWrapper>
          )}
        </ThemesWrapper>
      )}

      <NodeTippy content="Theme Changer">
        <PaletteButtonWrapper>
          <IconButton
            icon={<ColorPaletteIcon />}
            size="lg"
            onClick={() => setAreThemesVisible(!areThemesVisible)}
            shouldResize
          />
        </PaletteButtonWrapper>
      </NodeTippy>
    </ThemePickerWrapper>
  );
};

export default ThemePicker;
