"use client";
import CustomGrid from "@/components/grid/grid";
import { UtilityAPI } from "@/models/UtilityAPI";
import { GridColDef } from "@lib/grid";
import { Grid } from "@lib/mui";
import React from "react";

const columns: GridColDef[] = [
  { field: "utility_id", headerName: "Utility ID", flex: 1, minWidth: 150 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 150,
  },
  { field: "state", headerName: "State", flex: 1, minWidth: 150 },
];

interface UtilitiesGridProps {
  utilities: UtilityAPI[];
  filter?: any;
  onFilterModelChange?: (filterModel: any) => void;
  handleRowClick?: (data: any) => any;
}

const UtilitiesGrid: React.FC<UtilitiesGridProps> = (props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CustomGrid
            pageSize={5}
            rows={props.utilities}
            columns={columns}
            filter={props.filter || []}
            onFilterModelChange={props.onFilterModelChange}
            rowCallback={props.handleRowClick}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UtilitiesGrid;
