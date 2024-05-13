"use client";
import { DetailType } from "@/components/detail/detail";
import SimpleLayout from "@/components/simple/simple";
import { Inverter } from "@/models/Inverter";
import { getInverter } from "@/services/inverters";
import SensorsGrid from "@home/sensors/components/grid";
import { Box, Button, Grid, ListItem, ListItemText } from "@lib/mui";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [inverter, setInverter] = useState({} as Inverter);

  const inverter_data = {
    "Inverter ID": inverter.id,
    Name: inverter.name,
    "Company Name": inverter.company_name,
    Group: inverter.group,
    Serial: inverter.serial,
    Manufacturer: inverter.manufacturer,
    Model: inverter.model,
    "Peak Power": inverter.peak_power,
    "Status": inverter.active ? 'Active' : 'Inactive',
  };

  useEffect(() => {
    const fetchData = async () => {
      const inverter: Inverter = await getInverter(params.id);
      setInverter(inverter);
    };
    fetchData();
  }, [params.id]);

  const InverterData = () => {
    const data = Object.entries(inverter_data);
    return (
      <Box paddingX={3}>
        <h4>Inverter data</h4>
        <Grid style={{ overflow: "auto" }} container spacing={1}>
          {data.map(([key, value]) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={key}>
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
    return <SensorsGrid inverter_id={inverter.id} />;
  };

  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>{inverter.name}</h2>
        </Grid>
        <Grid item mb={0}>
          <Button href="/home/inverters">View All Inverters</Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SimpleLayout
            data={<InverterData />}
            grid={<DetailedGrid />}
            type={DetailType.INVERTER}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
