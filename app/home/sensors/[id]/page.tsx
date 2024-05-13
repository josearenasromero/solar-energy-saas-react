"use client";
import { DetailType } from "@/components/detail/detail";
import SimpleLayout from "@/components/simple/simple";
import { Sensor } from "@/models/Sensor";
import { getSensor } from "@/services/sensors";
import MeasurementsGrid from "@home/measurements/components/grid";
import { Box, Button, Grid, ListItem, ListItemText } from "@lib/mui";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [sensor, setSensor] = useState({} as Sensor);

  const sensor_data = {
    "Sensor ID": sensor.id,
    Name: sensor.name,
    "Inverter ID": sensor.inverter_id,
    Description: sensor.description,
    Formula: sensor.formula,
    Referent: sensor.referent,
    Sampling: sensor.sampling,
    "Day Aggregation": sensor.day_aggregation,
    "Month Aggregation": sensor.month_aggregation,
    Unit: sensor.unit,
    "Sensor Type": sensor.sensor_type,
  };

  useEffect(() => {
    const fetchData = async () => {
      const sensor: Sensor = await getSensor(params.id);
      setSensor(sensor);
    };
    fetchData();
  }, [params.id]);

  const SensorData = () => {
    const data = Object.entries(sensor_data);
    return (
      <Box paddingX={3}>
        <h4>Sensor data</h4>
        <Grid style={{ overflow: "auto" }} container spacing={1}>
          {data.map(([key, value]) => (
            <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
              <ListItem style={{ padding: 0 }}>
                <Box textAlign="right">
                  <span><b>{key}:</b> </span>
                </Box>
                <ListItemText
                  style={{
                    marginLeft: 15,
                    verticalAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  secondaryTypographyProps={{ align: "left" }}
                  primary={String(value).trim()}
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const DetailedGrid = () => {
    return <MeasurementsGrid sensor_id={sensor.id} />;
  };

  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>{sensor.name}</h2>
        </Grid>
        <Grid item mb={0}>
          <Button href="/home/sensors">View All Sensors</Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SimpleLayout
            data={<SensorData />}
            grid={<DetailedGrid />}
            type={DetailType.SENSOR}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
