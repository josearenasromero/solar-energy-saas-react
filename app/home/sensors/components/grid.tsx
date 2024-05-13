"use client";
import CustomGrid from "@/components/grid/grid";
import { GridCellParams, GridColDef, GridRowParams } from "@lib/grid";
import { Button, Grid } from "@lib/mui";
import { Sensor } from "@models/Sensor";
import { fetchSensors } from "@services/sensors";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OptionsCellProps {
  row: GridCellParams["row"];
}

function OptionsCell(props: OptionsCellProps) {
  const router = useRouter();
  const { row } = props;

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button
          onClick={() => {
            router.push(`/home/sensors/${row.id}`);
          }}
          color="primary"
        >
          View Sensor
        </Button>
      </Grid>
      <Grid item>
        <Button color="primary">Edit</Button>
      </Grid>
    </Grid>
  );
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Sensor ID", flex: 1, minWidth: 150 },
  { field: "inverter_id", headerName: "Inverter ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "referent", headerName: "Referent", flex: 1, minWidth: 150 },
  { field: "unit", headerName: "Unit", flex: 1, minWidth: 150 },
  { field: "sensor_type", headerName: "Type", flex: 1, minWidth: 150 },
];

interface SensorsGridProps {
  inverter_id?: string;
}

const SensorsGrid: React.FC<SensorsGridProps> = (props) => {
  const [sensors, setSensors] = useState([] as Sensor[]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const sensorsData: any = await fetchSensors(props);
      setSensors(sensorsData.items);
    };
    fetchData();
  }, [props]);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      router.push(`/home/sensors/${event.row.id}`);
    }
  };

  return sensors ? (
    <CustomGrid rowCallback={handleRowClick} rows={sensors} columns={columns} />
  ) : (
    ""
  );
};

export default SensorsGrid;
