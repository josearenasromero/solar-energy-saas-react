import { Button, Grid } from "@lib/mui";
import UsersGrid from "./components/grid";

export default function Page() {
  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>Users</h2>
        </Grid>
        <Grid item mb={0}>
          <Button href="./users/create">Create</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <UsersGrid />
        </Grid>
      </Grid>
    </Grid>
  );
}
