import { flexRender, Header } from "@tanstack/react-table";
import React, { FC } from "react";
import { TableRow } from "../../../../../../types/TableRow";
import { ExcelTableHeaderCellWrapper } from "./ExcelTableHeaderCell.components";

interface ExcelTableHeaderCellProps {
  header: Header<TableRow, unknown>;
}

const ExcelTableHeaderCell: FC<ExcelTableHeaderCellProps> = ({ header }) => {
  return (
    <ExcelTableHeaderCellWrapper>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </ExcelTableHeaderCellWrapper>
  );
};

export default ExcelTableHeaderCell;
