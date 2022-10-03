import React, { FC, useState } from "react";
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
import { ThemeType } from "../../../styles/themes/defaultTheme";
import ThemeIcon from "../ThemeIcon";
import { usePagination } from "../../../hooks/usePagination";

type ThemePickerProps = {
  themes: ThemeType[];
  onThemeChange: (theme: ThemeType) => void;
};

const ThemePicker: FC<ThemePickerProps> = ({ themes, onThemeChange }) => {
  const [areThemesVisible, setAreThemesVisible] = useState(false);

  const buttons = themes.map((theme, i) => (
    <ThemeButtonWrapper index={i % 3} key={i}>
      <IconButton
        icon={
          <ThemeIcon
            $primaryColor={theme.colors.background}
            $secondaryColor={theme.colors.secondary}
          />
        }
        size="sm"
        onClick={() => onThemeChange(theme)}
      />
    </ThemeButtonWrapper>
  ));

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
      <PaletteButtonWrapper>
        <IconButton
          icon={<ColorPaletteIcon />}
          size="lg"
          onClick={() => setAreThemesVisible(!areThemesVisible)}
        />
      </PaletteButtonWrapper>
    </ThemePickerWrapper>
  );
};

export default ThemePicker;
