import { Row } from "@tanstack/react-table";
import React, { FC } from "react";
import { TableRow } from "../../../../../../types/TableRow";
import ExcelTableRowCell from "../../Cells/ExcelTableRowCell";
import { ExcelTableDataRowWrapper } from "./ExcelTableDataRow.components";

interface ExcelTableDataRowProps {
  row: Row<TableRow>;
}

const ExcelTableDataRow: FC<ExcelTableDataRowProps> = ({ row }) => {
  return (
    <ExcelTableDataRowWrapper>
      {row.getVisibleCells().map((cell) => (
        <ExcelTableRowCell cell={cell} key={cell.id} />
      ))}
    </ExcelTableDataRowWrapper>
  );
};

export default ExcelTableDataRow;
