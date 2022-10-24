import styled from "styled-components";
import { ThemeType } from "../../../styles/themes/defaultTheme";

export const IconButtonWrapper = styled.button<{
  size: keyof ThemeType["dimensions"]["iconButton"];
  shouldResize?: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.iconButton.background};

  height: ${({ theme, size }) => theme.dimensions.iconButton[size]};
  width: ${({ theme, size }) => theme.dimensions.iconButton[size]};

  padding: 4px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover svg,
  &:focus svg {
    transform: scale(${({ shouldResize }) => (shouldResize ? 0.9 : 1)});
  }

  svg {
    fill: ${({ theme }) => theme.colors.iconButton.fill};

    height: 100%;
    width: 100%;

    transform-origin: 50% 50%;
    transition: transform 0.1s ease-out;
  }
`;
