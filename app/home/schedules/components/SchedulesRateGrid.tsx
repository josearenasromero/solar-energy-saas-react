"use client";
import CustomGrid from "@/components/grid/grid";
import { fetchSchedulesRates } from "@/services/schedule-rates";
import { GridColDef } from "@lib/grid";
import { ScheduleRate } from "@models/ScheduleRate";
import React, { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "real_schedule_id",
    headerName: "Schedule ID",
    flex: 1,
    minWidth: 150,
  },
  // { field: "utility_id", headerName: "Utility ID", flex: 1, minWidth: 150 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  { field: "rate_kwh", headerName: "Rate kWh", flex: 1, minWidth: 150 },
  { field: "min_kv", headerName: "Min kv", flex: 1, minWidth: 150 },
  { field: "max_kv", headerName: "Max kv", flex: 1, minWidth: 150 },
  { field: "determinant", headerName: "Determinant", flex: 1, minWidth: 150 },
  { field: "charge_unit", headerName: "Charge Unit", flex: 1, minWidth: 150 },
];

interface SchedulesRateGridProps {
  schedule_id?: string;
}

const SchedulesRateGrid: React.FC<SchedulesRateGridProps> = (props) => {
  const [scheduleRates, setScheduleRates] = useState([] as ScheduleRate[]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const invertersData: any = await fetchSchedulesRates(props);
      setScheduleRates(invertersData.items);
      setIsLoading(false);
    };
    fetchData();
  }, [props]);

  return (
    <CustomGrid loading={isLoading} rows={scheduleRates} columns={columns} />
  );
};

export default SchedulesRateGrid;
