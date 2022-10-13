import styled, { css } from "styled-components";

export const ThemePickerWrapper = styled.div`
  overflow: visible;
  position: relative;
`;

export const ThemesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  height: 50px;
  width: 100%;
`;

export const ThemeButtonWrapper = styled.div<{ index: number }>`
  position: absolute;

  ${({ index }) =>
    index === 0 &&
    css`
      bottom: 75px;
      left: 5px;
    `}

  ${({ index }) =>
    index === 1 &&
    css`
      bottom: 55px;
      left: 55px;
    `}
    
  ${({ index }) =>
    index === 2 &&
    css`
      bottom: 5px;
      left: 75px;
    `}
`;

export const ArrowWrapper = styled.div<{
  direction: "left" | "down";
}>`
  position: absolute;

  ${({ direction }) =>
    direction === "left" &&
    css`
      bottom: 83px;
      left: -24px;
    `}

  ${({ direction }) =>
    direction === "down" &&
    css`
      bottom: -24px;
      left: 83px;
    `}
`;

export const PaletteButtonWrapper = styled.div`
  position: relative;
  z-index: 2;
`;
