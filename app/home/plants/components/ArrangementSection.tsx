"use client";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { MODAL_BOX_MD, TEXTAREA_STYLES } from "@/lib/constants";
import { Plant } from "@/models/Plants";
import { updatePlant } from "@/services/plants";
import { Box, Button, Grid, Modal, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import MeterPlantGrid from "../../meterplant/components/grid";

const ArrangementSection = ({ plant }: { plant: Plant }) => {
  const [meterModal, setMeterModal] = useState(false);
  const [schedulesModal, setSchedulesModal] = useState(false);
  const [meterPlantList, setMeterPlantList] = useState({});
  const [newPlant, setNewPlant] = useState({} as Plant);
  const showSnackbar = useSnackbar();

  const updateMeterPlant = async () => {
    if (!Object.keys(meterPlantList).length) {
      showSnackbar("No changes were made", "info");
      setMeterModal(false);
      return;
    }

    const updatedPlant = await updatePlant(meterPlantList);
    if (updatedPlant.id) {
      const message = updatedPlant.status
        ? updatedPlant.status
        : "No meters found";
      const severity = updatedPlant.status ? "success" : "info";
      showSnackbar(message, severity);
      setNewPlant(updatedPlant);
    }
    setMeterModal(false);
    setMeterPlantList({});
  };

  return (
    <>
      <Grid container mb={2} justifyContent={"space-between"}>
        <h3>NEM Arrangement</h3>
        <Button
          onClick={() => {
            setMeterModal(true);
          }}
        >
          Add
        </Button>
      </Grid>
      <Grid container mb={2} justifyContent={"space-between"}>
        <MeterPlantGrid
          plant={plant}
          updatePlant={setNewPlant}
          meters={newPlant.id ? newPlant.meter_plant : plant.meter_plant}
        />
      </Grid>

      <Modal
        disableEnforceFocus
        open={meterModal}
        onClose={() => {
          setMeterModal(false);
          setMeterPlantList({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODAL_BOX_MD}>
          <h3>Add Meters</h3>
          <TextareaAutosize
            onChange={(event: any) => {
              if (event.target.value) {
                setMeterPlantList({
                  id: plant.id,
                  meter_id: event.target.value.split("\n"),
                });
              }
            }}
            style={TEXTAREA_STYLES}
            minRows={5}
            maxRows={10}
          />
          <Button style={{ marginTop: 10 }} onClick={updateMeterPlant}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ArrangementSection;
