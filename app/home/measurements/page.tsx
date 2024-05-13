import { Grid } from "@lib/mui";
import MeasurementsGrid from "./components/grid";

export default function Page() {
  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>Measurements</h2>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <MeasurementsGrid />
        </Grid>
      </Grid>
    </Grid>
  );
}
