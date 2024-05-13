"use client";
import CustomGrid from "@/components/grid/grid";
import { MODAL_BOX } from "@/lib/constants";
import { GridCellParams, GridColDef, GridRowParams } from "@lib/grid";
import { Box, Button, Grid, Modal } from "@lib/mui";
import { Schedule } from "@models/Schedule";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SchedulesIncrementalEnergyGrid from "./ScheduleIncrementalEnergyGrid";

interface OptionsCellProps {
  row: GridCellParams["row"];
}

function OptionsCell(props: OptionsCellProps) {
  const router = useRouter();
  const { row } = props;

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button
          onClick={() => {
            router.push(`/home/schedules/${row.id}`);
          }}
          color="primary"
        >
          View Schedule
        </Button>
      </Grid>
      <Grid item>
        <Button color="primary">Edit</Button>
      </Grid>
    </Grid>
  );
}

const columns: GridColDef[] = [
  { field: "schedule_id", headerName: "Schedule ID", flex: 1, minWidth: 50 },
  { field: "schedule_name", headerName: "Name", flex: 1, minWidth: 50 },
  { field: "option_type", headerName: "Option Type", flex: 1, minWidth: 50 },
  {
    field: "option_description",
    headerName: "Option Description",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "schedule_description",
    headerName: "Schedule Description",
    flex: 1,
    minWidth: 150,
  },
];

interface SchedulesGridProps {
  company_id?: string;
  schedules?: Schedule[];
  pageSize?: number;
  additionalProps?: any;
  handleSchedule: (schedule: any) => void;
}

const SchedulesGrid: React.FC<SchedulesGridProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({} as Schedule);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      props.handleSchedule({ schedule: event.row });
      setSelectedSchedule(event.row);
      //setModalOpen(true);
    }
  };

  return (
    <>
      <CustomGrid
        rowCallback={handleRowClick}
        pageSize={props.pageSize}
        rows={props.schedules || []}
        columns={columns}
        additionalProps={props.additionalProps}
      />

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
          {/* <h2>Schedule Rates</h2> */}
          {/* <SchedulesRateGrid schedule_id={selectedSchedule.id} /> */}
          {/* <h2>Schedule Energy Time</h2>
          <SchedulesEnergyTimeGrid schedule_id={selectedSchedule.id} /> */}
          <h2>Schedule Incremental Energy</h2>
          <SchedulesIncrementalEnergyGrid schedule_id={selectedSchedule.id} />
        </Box>
      </Modal>
    </>
  );
};

export default SchedulesGrid;
