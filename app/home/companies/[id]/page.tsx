"use client";
import { UtilityAPI } from "@/models/UtilityAPI";
import { fetchAuthorizations } from "@/services/authorizations";
import { fetchUtilities } from "@/services/utilities";
import { Card, Grid } from "@lib/mui";
import { Authorization } from "@models/Authorization";
import { Company } from "@models/Company";
import { getCompany } from "@services/companies";
import { useEffect, useState } from "react";
import CompanyData from '../components/CompanyData';

export default function Page({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState({} as Company);
  const [authorizations, setAuthorizations] = useState([] as Authorization[]);
  const [utilities, setUtilities] = useState([] as UtilityAPI[]);
  const cardStyle = { height: "230px", overflow: "auto" };
  useEffect(() => {
    const fetchData = async () => {
      const company: Company = await getCompany(params.id);
      setCompany(company);
      const authorizations: any = await fetchAuthorizations({});
      setAuthorizations(authorizations.items);
      const utilities: any = await fetchUtilities({});
      setUtilities(utilities.items);
    };
    fetchData();
  }, [params.id]);

  const handleUpdateCompany = (newCompany: Company) => {
    setCompany(newCompany);
  };

  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>{company.name}</h2>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid alignItems={"center"} container spacing={5}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card variant="outlined" style={cardStyle}>
                <CompanyData company={company} />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
}
