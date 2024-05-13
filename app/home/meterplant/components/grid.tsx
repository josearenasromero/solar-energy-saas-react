"use client";
import CustomGrid from "@/components/grid/grid";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { MODAL_BOX } from "@/lib/constants";
import { MeterFilterData, MeterInfo } from '@/models/MeterInfo';
import { MeterPlant } from "@/models/MeterPlant";
import { Plant } from "@/models/Plants";
import { Schedule } from "@/models/Schedule";
import { removeMeter, updateMeter } from "@/services/meters";
import { fetchMeterInfo } from '@/services/meters-info';
import { fetchSchedules } from "@/services/schedules";
import { GridCellParams, GridColDef } from "@lib/grid";
import { Box, Button, Checkbox, FormControlLabel, Grid, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SchedulesGrid from "../../schedules/components/grid";
import MeterFilters from './MeterFilters';
import MetersInfo from './MetersInfo';

interface OptionsCellProps {
  row: GridCellParams["row"];
  updateMeterData?: (meter: MeterPlant) => void;
  removeMeterData?: (meter: MeterPlant) => void;
}
function OptionsCell(props: OptionsCellProps) {
  const router = useRouter();
  const { row, updateMeterData, removeMeterData } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [meterModalOpen, setMeterModalOpen] = useState(false);
  const [meterInfoData, setMeterInfoData] = useState([] as MeterInfo[]);
  const [isLoading, setIsLoading] = useState(false);
  const [rateAcuity, setRateAcuity] = useState([] as Schedule[]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [formData, setFormData] = useState({});
  const showSnackbar = useSnackbar();
  const handleAutocompleteChange = (event: any, value: any) => {
    setFormData({ ...formData, schedule_id: value.id });
  };
  const handleUpdate = () => {
    const linkMeterSchedule = async () => {
      const updatedMeter: any = await updateMeter(formData);
      if (updatedMeter.id) {
        setModalOpen(false);
        showSnackbar("Schedule linked successfully");
        if (updateMeterData) updateMeterData(updatedMeter);
      }
    };
    linkMeterSchedule();
    setFormData({});
  };
  const meterModal = () => {
    setMeterModalOpen(true);
  };
  const fetchFilterData = async (params: MeterFilterData) => {
    setIsLoading(true);
    const fetchedMeterInfo: any = await fetchMeterInfo(params);
    if(fetchedMeterInfo.items){
      setMeterInfoData(fetchedMeterInfo.items);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      const scheduleData: any = await fetchSchedules({
        plant_id: row.plant_id,
      });
      setRateAcuity(scheduleData.items);
    };
    fetchData();
  }, [row.plant_id]);
  const handleOpenModal = () => {
    setModalOpen(true);
    setFormData({ ...formData, id: row.id });
  };
  const handleRemoveMeter = () => {
    const deleteMeter = async () => {
      const meterData: any = await removeMeter({ id: row.id });
      if (meterData.meter) {
        showSnackbar(`Meter ${meterData.meter.service_identifier} removed!`);
        if (removeMeterData) removeMeterData(meterData);
      }
    };
    deleteMeter();
  };
  const handleSchedule = (params: any) => {
    setFormData({ ...formData, schedule_id: params.schedule.id });
  };  

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button onClick={handleOpenModal} color="primary">
          Link
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleRemoveMeter} color="primary">
          Remove
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={meterModal} color="primary">
          Info
        </Button>
      </Grid>
      <Modal
        disableEnforceFocus
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_BOX}>
          <h2>Schedules</h2>
          <Grid>
            <SchedulesGrid
              pageSize={5}
              schedules={rateAcuity}
              handleSchedule={handleSchedule}
            />
            {/* <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-demo"
                options={rateAcuity}
                onChange={handleAutocompleteChange}
                getOptionLabel={(option) =>
                  `${option.schedule_name + " - " + option.schedule_description}`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="RateAcuity Schedule"
                    variant="outlined"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {`${"(" + option.schedule_id + ") " + option.schedule_name + " - " + option.schedule_description + " - (TYPE - " + option.option_type})`}
                    </li>
                  );
                }}
              /> */}
            <Button
              onClick={handleUpdate}
              style={{ float: "right" }}
              variant="text"
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        disableEnforceFocus
        open={meterModalOpen}
        onClose={() => {
          setMeterModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={MODAL_BOX}>
        <>
        <h2>Meter General Info</h2>
        <MeterFilters searchCallback={fetchFilterData} meter_id={row.meter_id} schedule_id={row.schedule_id}></MeterFilters>
        <MetersInfo meter_info={meterInfoData} meter_id={row.meter_id} isLoading={isLoading} schedule_id={row.schedule_id}></MetersInfo>
        </>
      </Box>
      </Modal>
    </Grid>
  );
}

interface MeterPlantGridProps {
  plant: Plant;
  meters?: MeterPlant[];
  updatePlant?: (plant: Plant) => void;
  updateMeterData?: (meter: MeterPlant) => void;
}

const MeterPlantGrid: React.FC<MeterPlantGridProps> = (props) => {
  const [meters, setMeters] = useState([] as MeterPlant[]);
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});  
  const {updateMeterData} = props;
  const showSnackbar = useSnackbar();

  const handleUpdate = (rowId: any, is_generator: any) => {  
    const generator = is_generator ? 1 : 0;    
    const formData = {
      id: rowId,
      is_generator: generator,
    };  

    const saveMeter = async () => {
      const updatedMeter: any = await updateMeter(formData);
      console.log(updatedMeter);
      if (updatedMeter.id) {    
        showSnackbar("Meter saved successfully");        
        if (updateMeterData){
          updateMeterData(updatedMeter);
        } 
      }
    };
    saveMeter();
  };

const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, rowId: string) => {
  const newState = { ...checkedState, [rowId]: event.target.checked };
  setCheckedState(newState);
  handleUpdate(rowId, event.target.checked);
};

  const columns: GridColDef[] = [
    {
      field: "service_identifier",
      headerName: "Service ID",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.meter ? params.row.meter?.service_identifier : "",
    },
    {
      field: "meter_numbers",
      headerName: "Meter Number",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.meter ? params.row.meter?.meter_numbers : "",
    },
    {
      field: "is_generator",
      headerName: "Generator",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const initialCheckedState = params.row.is_generator;
        return (
          <FormControlLabel
            label=""
            control={
              <Checkbox
                checked={checkedState[params.row.id] !== undefined ? checkedState[params.row.id] : initialCheckedState}
                onChange={(event) => handleCheckboxChange(event, params.row.id)}                
              />
            }
          />
        );
      },            
    },
    {
      field: "service_tariff",
      headerName: "Tariff",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.meter ? params.row.meter?.service_tariff : "",
    },
    {
      field: "service_address",
      headerName: "Address",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.meter ? params.row.meter?.service_address : "",
    },
    {
      field: "schedule",
      headerName: "Linked Rate",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.schedule
          ? "(" +
            params.row.schedule?.schedule_id +
            ") " +
            params.row.schedule?.schedule_name +
            " - (TYPE: " +
            params.row.schedule?.option_type +
            ") " +
            params.row.schedule?.schedule_description
          : "",
    },
    {
      field: "options",
      headerName: "",
      renderCell: (cellProps) =>
        OptionsCell({
          ...cellProps,
          updateMeterData: (meter: MeterPlant) => {
            const updatedMeters = meters.map((obj) =>
              obj.id === meter.id ? meter : obj
            );
            if (props.updatePlant)
              props.updatePlant({ ...props.plant, meter_plant: updatedMeters });
          },
          removeMeterData: (meter: MeterPlant) => {
            const updatedMeters = meters.filter((obj) => obj.id !== meter.id);
            if (props.updatePlant)
              props.updatePlant({ ...props.plant, meter_plant: updatedMeters });
          },
        }),
      flex: 1,
      minWidth: 300,
    },
  ];
  useEffect(() => {
    if (props.meters) {
      setMeters(props.meters);
    }
  }, [props]);

  return meters ? <CustomGrid rows={meters} columns={columns} /> : "";
};

export default MeterPlantGrid;
