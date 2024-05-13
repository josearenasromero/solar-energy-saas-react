"use client";
import DetailLayout from "@components/detail/detail";
import { Grid } from "@lib/mui";
import { Plant } from "@models/Plants";
import { getPlant } from "@services/plants";
import { useEffect, useState } from "react";
import DetailedSection from "../components/DetailedSection";
import PlantInformation from "../components/PlantInformation";

export default function Page({ params }: { params: { id: string } }) {
  const [plant, setPlant] = useState({} as Plant);

  useEffect(() => {
    const fetchData = async () => {
      const plant: Plant = await getPlant(params.id);
      setPlant(plant);
    };
    fetchData();
  }, [params.id]);

  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item xs={12} sm={12} md={3} lg={3} mb={5}>
          <h2>{plant.name}</h2>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <PlantInformation plant={plant} />
        </Grid>
      </Grid>

      <Grid container mt={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <DetailLayout grid={<DetailedSection plant={plant} />} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
}
