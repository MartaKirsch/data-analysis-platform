import styled from "styled-components";

export const ExcelTableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme }) => theme.colors.editableTable.cellSeparatorColor};
  }
  &:first-child {
    border-bottom: 1px solid
      ${({ theme }) => theme.colors.editableTable.cellSeparatorColor};
  }
`;
