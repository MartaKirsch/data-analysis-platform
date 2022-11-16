import styled from "styled-components";
import { IconButtonWrapper } from "../IconButton/IconButton.components";

export const ErrorIconWrapper = styled(IconButtonWrapper)`
  background-color: ${({ theme }) => theme.colors.errorIcon.background};

  svg {
    fill: ${({ theme }) => theme.colors.errorIcon.fill};
  }
`;
