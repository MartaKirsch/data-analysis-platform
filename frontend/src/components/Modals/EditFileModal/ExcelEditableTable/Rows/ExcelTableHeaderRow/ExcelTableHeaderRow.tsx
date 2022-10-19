import { HeaderGroup } from "@tanstack/react-table";
import React, { FC } from "react";
import { TableRow } from "../../../../../../types/TableRow";
import ExcelTableHeaderCell from "../../Cells/ExcelTableHeaderCell";
import { ExcelTableHeaderRowWrapper } from "./ExcelTableHeaderRow.components";

interface ExcelTableHeaderRowProps {
  headerGroup: HeaderGroup<TableRow>;
}

const ExcelTableHeaderRow: FC<ExcelTableHeaderRowProps> = ({ headerGroup }) => {
  return (
    <ExcelTableHeaderRowWrapper>
      {headerGroup.headers.map((header) => (
        <ExcelTableHeaderCell header={header} key={header.id} />
      ))}
    </ExcelTableHeaderRowWrapper>
  );
};

export default ExcelTableHeaderRow;
