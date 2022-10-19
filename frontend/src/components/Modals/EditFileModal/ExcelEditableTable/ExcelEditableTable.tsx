import React, { FC } from "react";
import { ComponentWithChildren } from "../../../../types/ComponentWithChildren";
import * as XLSX from "xlsx";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import {
  ExcelEditableTableComponent,
  ExcelEditableTableFieldWrapper,
} from "./ExcelEditableTable.components";
import { TableRow } from "../../../../types/TableRow";
import ExcelTableDataRow from "./Rows/ExcelTableDataRow";
import ExcelTableHeaderRow from "./Rows/ExcelTableHeaderRow";

interface ExcelEditableTableProps extends ComponentWithChildren {
  worksheet: XLSX.WorkSheet;
}

const ExcelEditableTable: FC<ExcelEditableTableProps> = ({ worksheet }) => {
  const getTableRows = (): TableRow[] => {
    return XLSX.utils.sheet_to_json(worksheet);
  };

  const columnHelper = createColumnHelper<TableRow>();

  const mapTableRowToColDef = (
    tableRow: TableRow
  ): ColumnDef<TableRow, any>[] =>
    Object.keys(tableRow).map((key) =>
      columnHelper.accessor(key, {
        id: key,
        header: key,
        cell: (cell) => <div>{cell.getValue()}</div>,
      })
    );

  const columns: ColumnDef<TableRow, any>[] = mapTableRowToColDef(
    getTableRows()[0]
  );

  const tableOptions: TableOptions<TableRow> = {
    data: getTableRows(),
    columns,
    getCoreRowModel: getCoreRowModel(),
  };
  const table = useReactTable<TableRow>(tableOptions);

  return (
    <ExcelEditableTableFieldWrapper>
      <ExcelEditableTableComponent>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <ExcelTableHeaderRow
              key={headerGroup.id}
              headerGroup={headerGroup}
            />
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <ExcelTableDataRow key={row.id} row={row} />
          ))}
        </tbody>
      </ExcelEditableTableComponent>
    </ExcelEditableTableFieldWrapper>
  );
};

export default ExcelEditableTable;
