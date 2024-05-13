"use client";
import { MODAL_BOX } from "@/lib/constants";
import UtilitiesGrid from "@components/UtilitiesGrid/UtilitiesGrid";
import SchedulesGrid from "@home/schedules/components/grid";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@lib/mui";
import { Schedule } from "@models/Schedule";
import { UtilityAPI } from "@models/UtilityAPI";
import { GridRowParams } from "@mui/x-data-grid";
import { fetchSchedules } from "@services/schedules";
import { fetchUtilities } from "@services/utilities";
import { useEffect, useState } from "react";

const SelectSchedulesSection = () => {
  const steps = ["Select utility", "Select schedules", "Success"];
  const [step, setStep] = useState(0);
  const [states, setStates] = useState([]);
  const [filter, setFilter] = useState([] as any[]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedUtility, setSelectedUtility] = useState({} as UtilityAPI);
  const [utilities, setUtilities] = useState([] as UtilityAPI[]);
  const [schedules, setSchedules] = useState([] as Schedule[]);

  useEffect(() => {
    const fetchData = async () => {
      const utilitiesData: any = await fetchUtilities({});
      setUtilities(utilitiesData.items);
      let states: any = new Set(
        utilitiesData.items.map((item: UtilityAPI) => item.state)
      );
      setStates(states);
    };
    fetchData();
  }, [setUtilities]);

  const getSchedules = async () => {
    setStep(1);
    const schedulesData: any = await fetchSchedules({
      utility_id: selectedUtility.utility_id,
    });
    setSchedules(schedulesData.items);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSelectedState(value);
    setFilter([
      {
        field: "state",
        operator: "equals",
        value,
      },
    ]);
  };

  const onFilterModelChange = (newFilterModel: any) =>
    setFilter(newFilterModel);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      setSelectedUtility(event.row);
    }
  };

  return (
    <Box sx={MODAL_BOX}>
      <Typography component={"span"} sx={{ mt: 2 }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Typography>

      {/* ---------- SELECT UTILITIES ----------*/}
      {step === 0 && (
        <Grid container>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={5}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              mb={2}
              style={{ float: "right" }}
            >
              <span>
                <b>Selected utility: </b>
                {selectedUtility.name || "None"}
              </span>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={2}
              lg={2}
              mb={2}
              style={{ float: "right" }}
            >
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state-select"
                value={selectedState}
                onChange={handleChange}
              >
                {Array.from(states).map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} sm={12} md={12} lg={12} item>
              <UtilitiesGrid
                filter={filter}
                onFilterModelChange={onFilterModelChange}
                handleRowClick={handleRowClick}
                utilities={utilities}
              ></UtilitiesGrid>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} item>
              <Button
                disabled={!selectedUtility.id}
                style={{ float: "right" }}
                onClick={getSchedules}
                color="primary"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* ---------- SELECT SCHEDULES ----------*/}
      {step === 1 && (
        <Grid container>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={5}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              mb={2}
              style={{ float: "right" }}
            >
              <span>
                <b>Selected utility: </b>
                {selectedUtility.name || "None"}
              </span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12} sm={12} md={12} lg={12} item>
              <SchedulesGrid
                additionalProps={{ checkboxSelection: true }}
                pageSize={5}
                schedules={schedules}
                handleSchedule={() => {}}
              />
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} item>
              <Button
                disabled={true}
                style={{ float: "right" }}
                onClick={() => {
                  setStep(step + 1);
                }}
                color="primary"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SelectSchedulesSection;
