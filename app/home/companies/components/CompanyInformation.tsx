"use client";
import { UtilityAPI } from "@/models/UtilityAPI";
import { updateCompany } from "@/services/companies";
import ConfirmationDialog from "@components/ConfirmationDialog/ConfirmationDialog";
import { useSnackbar } from "@contexts/SnackbarContext";
import { Autocomplete, Box, Button, Grid, TextField } from "@lib/mui";
import { Authorization } from "@models/Authorization";
import { Company } from "@models/Company";
import { useState } from "react";

const CompanyInformation = ({
  company,
  authorizations,
  utilities,
  handleUpdateCompany,
}: {
  company: Company;
  authorizations: Authorization[];
  utilities: UtilityAPI[];
  handleUpdateCompany: any;
}) => {
  const [displayAuthorizations, setDisplayAuthorizations] = useState(false);
  const [displayUtilities, setDisplayUtilities] = useState(false);
  const [selectedAuthorization, setSelectedAuthorization] = useState(null);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const showSnackbar = useSnackbar();

  const handleAutocompleteChange = (event: any, value: any) => {
    setSelectedAuthorization(value.id);
  };

  const handleUtilityChange = (event: any, value: any) => {
    setSelectedUtility(value.id);
  };

  const saveCompany = async () => {
    const updatedCompany = await updateCompany(formData);
    if (updatedCompany.id) {
      showSnackbar("Company successfully updated");
      setConfirmationDialog(false);
      handleUpdateCompany(updatedCompany);
      setDisplayAuthorizations(false);
      setDisplayUtilities(false);
    }
  };

  //console.log(company);

  return (
    <Box paddingX={3}>
      <h3>Additional information</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container justifyContent={"left"}>
            <Grid item marginRight={3}>
              <span>
                <b style={{ marginRight: 12 }}>Status: </b>
                {company.active ? "Active" : "Inactive"}
              </span>
            </Grid>
            <Grid item>
              <Button
                style={{ marginTop: 0 }}
                onClick={() => {
                  setFormData({
                    id: company.id,
                    active: !company.active,
                  });
                  setConfirmationDialog(true);
                }}
                variant="text"
              >
                {company.active ? "Disable" : "Enable"} Company
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <span>
                <b style={{ marginRight: 12 }}>Linked Utility:</b>
              </span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button
                style={{ float: "right" }}
                onClick={() => {
                  setDisplayUtilities(!displayUtilities);
                }}
                variant="text"
              >
                Change Utility
              </Button>
            </Grid>
            <Grid>{company.utility ? `${company.utility?.name}` : "None"}</Grid>
            <Grid
              hidden={!displayUtilities}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              marginY={1}
            >
              <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                options={utilities}
                onChange={handleUtilityChange}
                getOptionLabel={(option) => `${option.name}`}
                renderInput={(params) => (
                  <TextField {...params} label="Utility" variant="outlined" />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {`${option.name} (${option.id})`}
                    </li>
                  );
                }}
              />
              <Button
                onClick={() => {
                  setFormData({
                    id: company.id,
                    utility_id: selectedUtility,
                  });
                  if (selectedUtility) setConfirmationDialog(true);
                }}
                style={{ float: "right" }}
                variant="text"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <span>
                <b style={{ marginRight: 12 }}>Linked Authorization:</b>
              </span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button
                style={{ float: "right" }}
                onClick={() => {
                  setDisplayAuthorizations(!displayAuthorizations);
                }}
                variant="text"
              >
                Change Authorization
              </Button>
            </Grid>
            <Grid>
              {company.authorization
                ? `${company.authorization?.utility} (${company.authorization?.utility_id})`
                : "None"}
            </Grid>
            <Grid
              hidden={!displayAuthorizations}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              marginY={1}
            >
              <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                options={authorizations}
                onChange={handleAutocompleteChange}
                getOptionLabel={(option) =>
                  `${option.utility} (${option.utility_id})`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Authorization"
                    variant="outlined"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {`${option.utility} (${option.utility_id})`}
                    </li>
                  );
                }}
              />
              <Button
                onClick={() => {
                  setFormData({
                    id: company.id,
                    authorization_id: selectedAuthorization,
                  });
                  if (selectedAuthorization) setConfirmationDialog(true);
                }}
                style={{ float: "right" }}
                variant="text"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <ConfirmationDialog
            params={{
              confirmationDialog: confirmationDialog,
              confirmCallback: saveCompany,
              cancelCallback: () => {
                setConfirmationDialog(false);
              },
              title: <span>Update Company</span>,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyInformation;
