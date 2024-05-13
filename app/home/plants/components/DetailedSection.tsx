"use client";
import { Plant } from "@/models/Plants";
import { Grid, Modal } from "@lib/mui";
import { useState } from "react";
import InvertersGrid from "../../inverters/components/grid";
import ArrangementSection from "./ArrangementSection";
import StatementsSection from "./StatementsSection";
interface GridFiltersProps {
  searchCallback: (filters: any) => void;
}
const DetailedSection = (
  { plant }: { plant: Plant },
  GridFiltersProps: GridFiltersProps
) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Grid container>
        <StatementsSection plant={plant} />
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ArrangementSection plant={plant} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container mb={2} justifyContent={"space-between"}>
            <h3>Total Output</h3>
          </Grid>
          <InvertersGrid plant_id={plant.id} />
        </Grid>
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
        <>{/* <SelectSchedulesSection /> */}</>
      </Modal>
    </>
  );
};

export default DetailedSection;
