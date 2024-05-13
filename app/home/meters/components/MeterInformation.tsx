"use client";
import { Inverter } from "@/models/Inverter";
import { Meter } from "@/models/Meter";
import { getInverter, updateInverter } from "@/services/inverters";
import { fetchMeters } from "@/services/meters";
import ConfirmationDialog from "@components/ConfirmationDialog/ConfirmationDialog";
import { useSnackbar } from "@contexts/SnackbarContext";
import { Autocomplete, Box, Button, Grid, TextField } from "@lib/mui";
import { useEffect, useState } from "react";

const MeterInformation = ({selectedInverter, authorization_id}:{selectedInverter : any, authorization_id: number}) => {
  const [displayMeters, setDisplayMeters] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [allMeters, setAllMeters] = useState([] as Meter[]);
  const [formData, setFormData] = useState({});
  const [currentInverter, setCurrentInverter] = useState({} as Inverter);
  const showSnackbar = useSnackbar();
  useEffect(() => {
    const fetchData = async () => {
      const metersData: any = await fetchMeters({authorization_id: authorization_id});
      setAllMeters(metersData.items);
      const inverterData : any = await getInverter(selectedInverter);
      setCurrentInverter(inverterData)
    };
    fetchData();
  }, [selectedInverter, authorization_id]);
  
  const handleMeterChange = (event: any, value: any) => {
    setSelectedMeter(value.id);
  };

  const saveInverter = async () => {
    const updatedInverter = await updateInverter(formData);
    if (updatedInverter.id) {
      showSnackbar("Inverter successfully updated");
      setConfirmationDialog(false);
      setDisplayMeters(false);
      setCurrentInverter(updatedInverter);
    }
  };

  return (
    <Box paddingX={3}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <span>
                <b style={{ marginRight: 12 }}>Linked Meter:</b>
              </span>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button
                style={{ float: "right" }}
                onClick={() => {
                  setDisplayMeters(!displayMeters);
                }}
                variant="text"
              >
                Change Meter
              </Button>
            </Grid>
            <Grid>{currentInverter.meter ? `${currentInverter.meter?.service_identifier}` : "None"}</Grid>
            <Grid
              hidden={!displayMeters}
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
                options={allMeters}
                onChange={handleMeterChange}
                getOptionLabel={(option) => `${option.service_identifier}`}
                renderInput={(params) => (
                  <TextField {...params} label="Meter" variant="outlined" />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {`${option.service_identifier} (${option.id})`}
                    </li>
                  );
                }}
              />
              <Button
                onClick={() => {
                  setFormData({
                    id: selectedInverter,
                    meter_id: selectedMeter,
                  });
                  if (selectedMeter) setConfirmationDialog(true);
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
              confirmCallback: saveInverter,
              cancelCallback: () => {
                setConfirmationDialog(false);
              },
              title: <span>Update Inverter</span>,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeterInformation;
