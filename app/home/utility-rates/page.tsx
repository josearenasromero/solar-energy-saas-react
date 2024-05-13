"use client";
import { Grid } from "@lib/mui";
import UtilitiesGrid from "./components/grid";

export default function Page() {
  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>Utilities</h2>
        </Grid>
        {/* <Grid item mb={0}>
          <Button>Create</Button>
        </Grid> */}
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <UtilitiesGrid />
        </Grid>
      </Grid>
    </Grid>
  );
}
