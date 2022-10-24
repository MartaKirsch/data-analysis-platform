import { flexRender, Cell } from "@tanstack/react-table";
import React, { FC } from "react";
import { TableRow } from "../../../../../../types/TableRow";
import { ExcelTableRowCellWrapper } from "./ExcelTableRowCell.components";

interface ExcelTableRowCellProps {
  cell: Cell<TableRow, unknown>;
}

const ExcelTableRowCell: FC<ExcelTableRowCellProps> = ({ cell }) => {
  return (
    <ExcelTableRowCellWrapper>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </ExcelTableRowCellWrapper>
  );
};

export default ExcelTableRowCell;
