"use client";
import CustomGrid from "@/components/grid/grid";
import { GridCellParams, GridColDef } from "@lib/grid";
import { Button, Grid } from "@lib/mui";
import { Measurement } from "@models/Measurement";
import { fetchMeasurements } from "@services/measurements";
import React, { useEffect, useState } from "react";

interface OptionsCellProps {
  row: GridCellParams["row"];
}

function OptionsCell(props: OptionsCellProps) {
  // eslint-disable-next-line no-unused-vars
  const { row } = props;

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button color="primary">Edit</Button>
      </Grid>
    </Grid>
  );
}

const columns: GridColDef[] = [
  { field: "sensor_id", headerName: "Sensor ID", flex: 1, minWidth: 150 },
  { field: "collected_at", headerName: "Timestamp", flex: 1, minWidth: 150 },
  { field: "timezone", headerName: "Timezone", flex: 1, minWidth: 150 },
  { field: "value", headerName: "Value", flex: 1, minWidth: 150 },
];

interface MeasurementsGridProps {
  sensor_id?: string;
}

const MeasurementsGrid: React.FC<MeasurementsGridProps> = (props) => {
  const [measurements, setMeasurements] = useState([] as Measurement[]);
  useEffect(() => {
    const fetchData = async () => {
      const measurementsData: any = await fetchMeasurements(props);
      setMeasurements(measurementsData.items);
    };
    fetchData();
  }, [props]);

  return measurements ? (
    <CustomGrid rows={measurements} columns={columns} />
  ) : (
    ""
  );
};

export default MeasurementsGrid;
