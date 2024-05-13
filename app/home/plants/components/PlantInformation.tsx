"use client";
import { AESites } from "@/models/AESites";
import { Plant } from "@/models/Plants";
import { UtilityAPI } from "@/models/UtilityAPI";
import { fetchAuthorizations } from "@/services/authorizations";
import { updatePlant } from "@/services/plants";
import { fetchUtilities } from "@/services/utilities";
import { fetchAESites } from "@/services/aesites";
import { useSnackbar } from "@contexts/SnackbarContext";
import { Autocomplete, Box, Card, Grid, TextField } from "@lib/mui";
import { Authorization } from "@models/Authorization";
import { useEffect, useState } from "react";

const PlantInformation = ({ plant }: { plant: Plant }) => {
  const showSnackbar = useSnackbar();
  const [authorizations, setAuthorizations] = useState([] as Authorization[]);
  const [utilities, setUtilities] = useState([] as UtilityAPI[]);
  const [selectedAuthorization, setSelectedAuthorization] = useState(
    {} as Authorization
  );
  const [selectedUtility, setSelectedUtility] = useState({} as UtilityAPI);

  const [aeSites, setAESites] = useState([] as AESites[]);
  const [selectedAESites, setSelectedAESites] = useState({} as AESites);

  useEffect(() => {
    const fetchData = async () => {
      const authorizations: any = await fetchAuthorizations({});
      setAuthorizations(authorizations.items);
      const utilities: any = await fetchUtilities({});
      setUtilities(utilities.items);
      const aeSites: any = await fetchAESites({});
      setAESites(aeSites.items);
    };

    if (plant.id) {
      setSelectedAuthorization(plant.authorization);
      setSelectedUtility(plant.utility);  
      setSelectedAESites(plant.ae_site); 
      
      fetchData();
    }
  }, [plant]);

  const handleAuthorizationChange = (event: any, value: any) => {
    setSelectedAuthorization(value);
    savePlant({
      id: plant.id,
      authorization_id: value.id,
    });
  };

  const handleUtilityChange = (event: any, value: any) => {
    savePlant({
      id: plant.id,
      utility_id: value.id,
    });
  };

  const handleAESiteChange = (event: any, value: any) => {  
    savePlant({
      id: plant.id,
      ae_site_id: value.id,
    });
  };

  const savePlant = async (data: Partial<Plant>) => {
    const updatedPlant = await updatePlant(data);    
    if (updatedPlant.id) {
      showSnackbar("Plant successfully updated");
      setSelectedAuthorization(updatedPlant.authorization);
      setSelectedUtility(updatedPlant.utility);
      setSelectedAESites(updatedPlant.ae_site);
    }
  };



  return (
    <Box>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={3.5} lg={4}>
          <Card variant="outlined" style={{ padding: 15 }}>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <span>
                  <b style={{ marginRight: 12 }}>Linked AE Site:</b>
                </span>
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={8} marginY={1}>
                <Autocomplete
                  value={selectedAESites}
                  defaultValue={plant.ae_site}
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  options={aeSites}
                  onChange={handleAESiteChange}
                  getOptionLabel={(option) => `${option.name}`}
                  renderInput={(params) => (
                    <TextField {...params} label="AESites" variant="outlined" />
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {`${option.name} (${option.id})`}
                      </li>
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={3.5} lg={3}>
          <Card variant="outlined" style={{ padding: 15 }}>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <span>
                  <b style={{ marginRight: 12 }}>Linked Utility:</b>
                </span>
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={8} marginY={1}>
                <Autocomplete
                  value={selectedUtility}
                  defaultValue={plant.utility}
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
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Card variant="outlined" style={{ padding: 15 }}>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <span>
                  <b style={{ marginRight: 12 }}>Linked Authorization:</b>
                </span>
              </Grid>

              <Grid item xs={12} sm={12} md={7} lg={8} marginY={1}>
                <Autocomplete
                  value={selectedAuthorization}
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  options={authorizations}
                  onChange={handleAuthorizationChange}
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
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlantInformation;
