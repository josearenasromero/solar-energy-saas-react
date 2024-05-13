"use client";
import CustomGrid from "@/components/grid/grid";
import { useSnackbar } from '@/contexts/SnackbarContext';
import { MODAL_BOX_MD } from '@/lib/constants';
import { Meter } from '@/models/Meter';
import { Schedule } from '@/models/Schedule';
import { updateMeter } from '@/services/meters';
import { fetchSchedules } from '@/services/schedules';
import { GridCellParams, GridColDef, GridRowParams } from "@lib/grid";
import { Autocomplete, Box, Button, Grid, Modal, TextField } from '@mui/material';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OptionsCellProps {
  row: GridCellParams["row"];
}
function OptionsCell(props: OptionsCellProps) {
  const router = useRouter();
  const { row } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [rateAcuity, setRateAcuity] = useState([] as Schedule[]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [formData, setFormData] = useState({});
  const showSnackbar = useSnackbar();
  const handleAutocompleteChange = (event: any, value: any) => {
    setFormData({...formData, schedule_id: value.id})
  };
  const handleUpdate = () => {
    const linkMeterSchedule = async () => {
      const updatedMeter: any = await updateMeter(formData);
      if(updatedMeter.id){
        setModalOpen(false);
        showSnackbar("Schedule linked successfully");
      }
    }
    linkMeterSchedule();
  }
  useEffect(()=> {
    const fetchData = async () =>{
      const scheduleData: any = await fetchSchedules({});
      setRateAcuity(scheduleData.items);
    }
    fetchData();
  }, []);
  const handleOpenModal = () => {
    setModalOpen(true);
    setFormData({...formData, id: row.id});
  };
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button onClick={handleOpenModal} color="primary">
          Link
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
        <Box sx={MODAL_BOX_MD}>
          <h2>RateAcuity Schedules</h2>
          <Grid>
          <Autocomplete
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
                      {`${option.schedule_name + " - " + option.schedule_description}`}
                    </li>
                  );
                }}
              />
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
    </Grid>
  );
}
const columns: GridColDef[] = [
  { field: "service_identifier", headerName: "Service ID", flex: 1, minWidth: 150 },
  { field: "meter_numbers", headerName: "Meter Numbers", flex: 1, minWidth: 150 },
  { field: "service_tariff", headerName: "Tariff", flex: 1, minWidth: 150 },
  // { field: "utilityapi_meter_id", headerName: "Meter ID", flex: 1, minWidth: 150 },
  { field: "service_address", headerName: "Address", flex: 1, minWidth: 150 },
  //{ field: "schedule_id", headerName: "Linked Schedule", flex: 1, minWidth: 150 },
  {
    field: "schedule",
    headerName: "Linked Rate",
    flex: 1,
    minWidth: 150,
    valueGetter: (params) => params.row.schedule ? params.row.schedule?.schedule_name + " - " + params.row.schedule?.schedule_description : "",
  },
  {
    field: "options",
    headerName: "",
    renderCell: OptionsCell,
    flex: 1,
    minWidth: 200,
  },
];

interface MetersGridProps {
  //authorization_id?: number;
  meters?: Meter[]
}

const MetersGrid: React.FC<MetersGridProps> = (props) => {
  const [meters, setMeters] = useState([] as Meter[]);
  const router = useRouter();
  useEffect(() => {
    // const fetchData = async () => {
    //   const metersData: any = await fetchMeters(props);
    //   setMeters(metersData.items);
    // };
    // fetchData();
    if(props.meters){
      setMeters(props.meters);
    }
  }, [props]);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      //router.push(`/home/sensors/${event.row.id}`);
    }
  };

  return meters ? (
    <CustomGrid rowCallback={handleRowClick} rows={meters} columns={columns} />
  ) : (
    ""
  );
};

export default MetersGrid;
