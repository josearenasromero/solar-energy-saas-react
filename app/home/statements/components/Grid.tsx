"use client";
import CustomGrid from "@/components/grid/grid";
import { GridCellParams, GridColDef } from "@lib/grid";
import { Statement } from "@models/Statement";
import React from "react";

interface OptionsCellProps {
  row: GridCellParams["row"];
}

const columns: GridColDef[] = [
  {
    field: "meter",
    headerName: "Meter",
    flex: 1,
    minWidth: 150,
    /*valueGetter: (params) => {
      return params.row.plant?.name;
    },*/
  },
  {
    field: "total_usage",
    headerName: "Total Usage (kWh)",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "net_usage",
    headerName: "Net Usage (kWh)",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "bill_w_o_solar",
    headerName: "Bill w/o solar",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "bill_w_solar",
    headerName: "Bill w/ Solar",
    flex: 1,
    minWidth: 150,
  },
  { field: "savings", headerName: "Savings", flex: 1, minWidth: 150 },
];

interface StatementsGridProps {
  statements: Statement[];
  isLoading?: boolean;
}

const StatementsGrid: React.FC<StatementsGridProps> = (props) => {
  return (
    <>
      <CustomGrid
        rows={props.statements}
        loading={props.isLoading}
        columns={columns}
      ></CustomGrid>
    </>
  );
};

export default StatementsGrid;
