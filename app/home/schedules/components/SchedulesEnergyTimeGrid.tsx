"use client";
import CustomGrid from "@/components/grid/grid";
import { ScheduleEnergyTime } from "@/models/ScheduleEnergyTime";
import { fetchSchedulesEnergyTime } from "@/services/schedule-energy-time";
import { GridColDef } from "@lib/grid";
import React, { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  { field: "pending", headerName: "pending", flex: 1, minWidth: 150 },
  { field: "rate_kwh", headerName: "Rate kWh", flex: 1, minWidth: 150 },
  { field: "min_kv", headerName: "Min kv", flex: 1, minWidth: 150 },
  { field: "max_kv", headerName: "Max kv", flex: 1, minWidth: 150 },
  { field: "start_date", headerName: "Start Date", flex: 1, minWidth: 150 },
  { field: "end_date", headerName: "End Date", flex: 1, minWidth: 150 },
  { field: "start_time", headerName: "Start Time", flex: 1, minWidth: 150 },
  { field: "end_time", headerName: "End Time", flex: 1, minWidth: 150 },
  { field: "determinant", headerName: "Determinant", flex: 1, minWidth: 150 },
  { field: "charge_unit", headerName: "Charge Unit", flex: 1, minWidth: 150 },
];

interface SchedulesEnergyTimeGridProps {
  schedule_id?: string;
}

const SchedulesEnergyTimeGrid: React.FC<SchedulesEnergyTimeGridProps> = (props) => {
  const [scheduleEnergyTime, setScheduleEnergyTime] = useState([] as ScheduleEnergyTime[]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const energyTimeData: any = await fetchSchedulesEnergyTime(props);
      setScheduleEnergyTime(energyTimeData.items);
      setIsLoading(false);
    };
    fetchData();
  }, [props]);
  return (
    <CustomGrid loading={isLoading} rows={scheduleEnergyTime} columns={columns} />
  );
};

export default SchedulesEnergyTimeGrid;
