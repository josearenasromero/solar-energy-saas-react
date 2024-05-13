"use client";
import CustomGrid from "@/components/grid/grid";
import { MeterInfo } from '@/models/MeterInfo';
import { GridCellParams, GridColDef, GridColumnGroupingModel } from "@lib/grid";
import React from "react";

interface OptionsCellProps {
  row: GridCellParams["row"];
  //   updateMeterData?: (meter: MeterPlant) => void;
  //   removeMeterData?: (meter: MeterPlant) => void;
}

interface MeterInfoGridProps {
  //   plant: Plant;
  meter_id?: string;
  schedule_id?: string;
  isLoading?: boolean;
  meter_info: MeterInfo[];
}

const MetersInfo: React.FC<MeterInfoGridProps> = (props) => {

  const columnsGroup: (GridColumnGroupingModel) = [{
    groupId: "bill",
    children: [{ field: "bill_start_date" }, { field: "bill_end_date" }, { field: "bill_season" }]
  }]

  const columns: GridColDef[] = [
    {
      field: "bill_start_date",
      headerName: "Start Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "bill_end_date",
      headerName: "End Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "bill_season",
      headerName: "Season",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "net_on_peak",
      headerName: "On Peak",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "net_part_peak",
      headerName: "Part Peak",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "net_off_peak",
      headerName: "Off Peak",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "max_nc",
      headerName: "NC / Max",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "max_on",
      headerName: "On Peak",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "other",
      headerName: "Other",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "charge_nbc",
      headerName: "NBC",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "charge_energy",
      headerName: "Energy",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "charge_demand",
      headerName: "Demand",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "charge_total",
      headerName: "Total",
      flex: 1,
      minWidth: 150,
    },
  ];
  return <CustomGrid rows={props.meter_info} columns={columns} loading={props.isLoading} />;
};

export default MetersInfo;
