"use client";
import { Box, Grid, ListItem, ListItemText } from "@lib/mui";
import { Company } from "@models/Company";

const CompanyData = ({ company }: { company: Company }) => {
  const companyData = {
    Name: company.name,
    Country: company.country,
    City: company.city,
    Address: company.address1,
    "ZIP Code": company.zip_code,
    Owner: company.owner_first_name + " " + company.owner_last_name,
    "Owner Email": company.owner_email,
    "QoS Site ID": company.qos_site_id,
  };
  const data = Object.entries(companyData);
  return (
    <Box paddingX={3}>
      <h4>Company data</h4>
      <Grid style={{ overflow: "auto" }} container spacing={1}>
        {data.map(([key, value]) => (
          <Grid item xs={12} sm={12} md={6} lg={6} key={key}>
            <ListItem style={{ padding: 0 }}>
              <Box textAlign="right">
                <span>
                  <b>{key}:</b>
                </span>
              </Box>
              <ListItemText
                style={{
                  marginLeft: 15,
                  verticalAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                secondaryTypographyProps={{ align: "left" }}
                primary={String(value).trim()}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyData;
