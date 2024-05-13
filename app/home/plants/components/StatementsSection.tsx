"use client";
import { Plant } from "@/models/Plants";
import { Statement, StatementsFilterData } from "@models/Statement";
import { fetchStatements } from "@services/statements";
import { useState } from "react";
import StatementsGrid from "../../statements/components/Grid";
import GridFilters from "../../statements/components/GridFilters";

const StatementsSection = ({ plant }: { plant: Plant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statements, setStatements] = useState([] as Statement[]);
  const fetchData = async (params: StatementsFilterData) => {
    setIsLoading(true);
    const statementsInfo: any = await fetchStatements(params);
    setStatements(statementsInfo.items);
    setIsLoading(false);
  };

  return (
    <>
      <h3>Statements</h3>
      <GridFilters searchCallback={fetchData} plant={plant} />
      <StatementsGrid statements={statements} isLoading={isLoading} />
    </>
  );
};

export default StatementsSection;
