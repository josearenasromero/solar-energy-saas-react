import { Card, Grid } from "@lib/mui";
import React, { ReactNode } from "react";
import { DetailType } from "../detail/detail";

interface SimpleProps {
  data: ReactNode;
  grid: ReactNode;
  type: DetailType;
}

const cardStyle = { height: "230px", overflow: "auto" };
const SimpleLayout: React.FC<SimpleProps> = ({
  data,
  grid,
  type,
}) => {
  return (
    <div>
      <Grid alignItems={"center"} container spacing={5}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card variant="outlined" style={cardStyle}>
            {data}
          </Card>
        </Grid>
      </Grid>

      <Grid item mb={0}>
        <h3>
          {type == DetailType.COMPANY
            ? "Inverters"
            : type == DetailType.INVERTER
            ? "Sensors"
            : type == DetailType.SENSOR
            ? "Measurements"
            : "Children element"}
        </h3>
      </Grid>
      <Grid mt={3} container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          {grid}
        </Grid>
      </Grid>
    </div>
  );
};

export default SimpleLayout;
