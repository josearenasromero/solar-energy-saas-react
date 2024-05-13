import { Card, Grid } from "@lib/mui";
import React, { ReactNode } from "react";

interface DetailProps {
  data?: ReactNode;
  information?: ReactNode;
  grid: ReactNode;
}

export enum DetailType {
  COMPANY,
  INVERTER,
  SENSOR,
}

const cardStyle = { height: "300px", overflow: "auto" };
const DetailLayout: React.FC<DetailProps> = ({ data, information, grid }) => {
  return (
    <div>
      <Grid alignItems={"center"} container spacing={5}>
        {data && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card variant="outlined" style={cardStyle}>
              {data}
            </Card>
          </Grid>
        )}

        {information && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card variant="outlined" style={cardStyle}>
              {information}
            </Card>
          </Grid>
        )}
      </Grid>

      <Grid mt={3} container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          {grid}
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailLayout;
