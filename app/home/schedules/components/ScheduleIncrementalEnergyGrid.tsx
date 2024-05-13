"use client";
import CustomGrid from "@/components/grid/grid";
import { ScheduleIncrementalEnergy } from "@/models/ScheduleIncrementalEnergy";
import { fetchSchedulesIncrementalEnergy } from "@/services/schedule-incremental-energy";
import { GridColDef } from "@lib/grid";
import React, { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  { field: "pending", headerName: "pending", flex: 1, minWidth: 150 },
  { field: "rate_kwh", headerName: "Rate kWh", flex: 1, minWidth: 150 },
  { field: "start_kwh", headerName: "Start kWh", flex: 1, minWidth: 150 },
  { field: "end_kwh", headerName: "End kWh", flex: 1, minWidth: 150 },
  { field: "start_date", headerName: "Start Date", flex: 1, minWidth: 150 },
  { field: "end_date", headerName: "End Date", flex: 1, minWidth: 150 },
  { field: "start_time", headerName: "Start Time", flex: 1, minWidth: 150 },
  { field: "end_time", headerName: "End Time", flex: 1, minWidth: 150 },
  { field: "determinant", headerName: "Determinant", flex: 1, minWidth: 150 },
  { field: "charge_unit", headerName: "Charge Unit", flex: 1, minWidth: 150 },
];

interface SchedulesIncrementalEnergyGridProps {
  schedule_id?: string;
}

const SchedulesIncrementalEnergyGrid: React.FC<SchedulesIncrementalEnergyGridProps> = (props) => {
  const [scheduleIncrementalEnergy, setScheduleIncrementalEnergy] = useState([] as ScheduleIncrementalEnergy[]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const incrementalEnergyData: any = await fetchSchedulesIncrementalEnergy(props);
      setScheduleIncrementalEnergy(incrementalEnergyData.items);
      setIsLoading(false);
    };
    fetchData();
  }, [props]);

  return (
    <CustomGrid loading={isLoading} rows={scheduleIncrementalEnergy} columns={columns} />
  );
};

export default SchedulesIncrementalEnergyGrid;
