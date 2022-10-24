import { css } from "styled-components";

export const excelTableCellStyles = css`
  background-color: ${({ theme }) => theme.colors.editableTable.background};

  padding: 10px;

  border-left: 1px solid
    ${({ theme }) => theme.colors.editableTable.cellSeparatorColor};

  &:first-child {
    border-left: none;
  }

  white-space: nowrap;
`;
