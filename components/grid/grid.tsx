"use client";
import { ApiModel } from "@/models/ApiModel";
import { DataGrid, GridColDef, GridRowParams } from "@lib/grid";
import { Box } from "@lib/mui";
import React from "react";

interface GridProps {
  columns: GridColDef[];
  rows: ApiModel[];
  pageSize?: number;
  filter?: any;
  additionalProps?: any;
  loading?: boolean;
  rowCallback?: (data: GridRowParams) => void;
  onFilterModelChange?: (newFilterModel: any) => void;
}

const CustomGrid: React.FC<GridProps> = ({
  columns,
  rows,
  pageSize,
  filter,
  loading,
  additionalProps,
  rowCallback,
  onFilterModelChange,
}) => {
  return (
    <Box sx={{ height: "auto", width: "100%", marginBottom: 5 }}>
      <DataGrid
        loading={loading}
        {...(additionalProps || {})}
        autoHeight
        rows={rows}
        columns={columns}
        filterModel={{
          items: filter || [],
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize || 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        onRowClick={rowCallback}
        onFilterModelChange={onFilterModelChange}
      />
    </Box>
  );
};

export default CustomGrid;
