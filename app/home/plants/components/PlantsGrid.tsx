"use client";
import CustomGrid from "@/components/grid/grid";
import { Plant } from "@/models/Plants";
import { fetchPlants } from "@/services/plants";
import { GridColDef, GridRowParams } from "@lib/grid";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "type", headerName: "Type", flex: 1, minWidth: 150 },
  { field: "peak_power", headerName: "Peak Power", flex: 1, minWidth: 150 },
  { field: "timeZone", headerName: "Time Zone", flex: 1, minWidth: 150 },
  {
    field: "utility",
    headerName: "Utility",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.utility?.name,
  },
  {
    field: "authorization",
    headerName: "Authorization",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) =>
      params.row.authorization
        ? `${params.row.authorization?.utility} (${params.row.authorization?.utility_id})`
        : "",
  },
];

interface PlantsGridProps {
  // NOTE: Leaving this for future-proofing
  company_id?: string;
}

const PlantsGrid: React.FC<PlantsGridProps> = (props) => {
  const [plants, setPlants] = useState([] as Plant[]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      const plantsData: any = await fetchPlants(props);
      setPlants(plantsData.items);
    };
    fetchData();
  }, [props]);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      router.push(`/home/plants/${event.row.id}`);
    }
  };



  return plants ? (
    <CustomGrid
      rowCallback={handleRowClick}
      rows={plants}
      columns={columns}
    />
  ) : (
    ""
  );
};

export default PlantsGrid;
