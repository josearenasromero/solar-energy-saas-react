"use client";
import InvertersGrid from "@home/inverters/components/grid";
import SchedulesGrid from "@home/schedules/components/grid";
import { Button, Grid, Modal } from "@lib/mui";
import { Company } from "@models/Company";
import { useState } from "react";
import SelectSchedulesSection from "./SelectSchedulesSection";

const DetailedSection = ({ company }: { company: Company }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <h3>Schedules</h3>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            color="primary"
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SchedulesGrid
            schedules={company.utility?.schedules}
            company_id={company.id}
            handleSchedule={()=>{}}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h3>Inverters</h3>
          <InvertersGrid company_id={company.id} />
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
        <>
          <SelectSchedulesSection />
        </>
      </Modal>
    </>
  );
};

export default DetailedSection;
