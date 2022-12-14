import styled from "styled-components";

export const ExcelEditableTableFieldWrapper = styled.div`
  max-width: 100%;
  max-height: 70vh;

  overflow: auto;

  padding: 10px;

  background-color: ${({ theme }) => theme.colors.editableTable.background};
  color: ${({ theme }) => theme.colors.editableTable.text};
`;

export const ExcelEditableTableComponent = styled.table`
  border-spacing: 0;
  border-collapse: collapse;

  width: 100%;
`;
