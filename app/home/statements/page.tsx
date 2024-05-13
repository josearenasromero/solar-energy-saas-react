"use client";
import { fetchStatements } from "@/services/statements";
import { Grid } from "@lib/mui";
import { Statement, StatementsFilterData } from "@models/Statement";
import { useState } from "react";
import StatementsGrid from "./components/Grid";
import GridFilters from "./components/GridFilters";

export default function Page() {
  const [statements, setStatements] = useState([] as Statement[]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (params: StatementsFilterData) => {
    setIsLoading(true);
    const statementsInfo: any = await fetchStatements(params);
    setStatements(statementsInfo.items);
    setIsLoading(false);
  };

  return (
    <Grid container>
      <Grid
        alignItems={"center"}
        container
        justifyContent={"space-between"}
        mb={0}
      >
        <Grid item mb={0}>
          <h2>Statements</h2>
        </Grid>
      </Grid>

      <GridFilters searchCallback={fetchData}></GridFilters>
      <Grid container>
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <StatementsGrid statements={statements} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
}
