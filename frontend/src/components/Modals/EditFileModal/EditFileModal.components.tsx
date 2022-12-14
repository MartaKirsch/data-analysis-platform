import styled from "styled-components";

export const SheetNameButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) =>
    isActive
      ? theme.colors.sheetNameButton.activeBackground
      : theme.colors.sheetNameButton.notActiveBackground};
  color: ${({ theme }) => theme.colors.sheetNameButton.text};
  font-size: ${({ theme }) => theme.fonts.sizes.s};

  padding: 3px 20px 3px 10px;

  border-top-right-radius: 10px;
`;

export const SheetNameButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;
