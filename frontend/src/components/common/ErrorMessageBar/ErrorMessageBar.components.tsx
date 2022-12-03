import styled from "styled-components";
import { ThemeType } from "../../../styles/themes/defaultTheme";

export const ErrorMessageBarWrapper = styled.div`
  display: flex;
  align-items: center;

  margin: 10px 0;
`;

export const ErrorMessageBarText = styled.span<{
  size: keyof ThemeType["fonts"]["sizes"];
}>`
  font-size: ${({ theme, size }) => theme.fonts.sizes[size]};
  color: ${({ theme }) => theme.colors.errorText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  margin-left: 10px;
`;
