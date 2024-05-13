"use client";
import { Plant } from "@/models/Plants";
import { Box, Grid, ListItem, ListItemText } from "@lib/mui";

const PlantData = ({ plant }: { plant: Plant }) => {
  const plantData = {
    Name: plant.name,
    Type: plant.type,
    "Peak Power": plant.peak_power,
    "Commisioning Date": plant.commissioning_date,
    "Computation Start Date": plant.computation_start_date,
    "Time Zone": plant.timeZone,
    latitude: plant.latitude,
    longitud: plant.longitud,
  };
  const data = Object.entries(plantData);
  return (
    <Box paddingX={3}>
      <h4>Plant data</h4>
      <Grid style={{ overflow: "auto" }} container spacing={1}>
        {data.map(([key, value]) => (
          <Grid item xs={12} sm={12} md={6} lg={6} key={key}>
            <ListItem style={{ padding: 0 }}>
              <Box textAlign="right">
                <span>
                  <b>{key}:</b>
                </span>
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

export default PlantData;
