import { Grid } from "@lib/mui";
import PlantsGrid from "./components/PlantsGrid";

export default function Page() {
  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>Plants</h2>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <PlantsGrid />
        </Grid>
      </Grid>
    </Grid>
  );
}
