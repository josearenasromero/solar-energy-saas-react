import { Grid } from "@lib/mui";
import ExtractionLogsGrid from "./components/ExtractionLogsGrid";

export default function Page() {
  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>Extraction Logs</h2>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <ExtractionLogsGrid />
        </Grid>
      </Grid>
    </Grid>
  );
}
