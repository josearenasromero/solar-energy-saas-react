"use client";
import CustomGrid from "@/components/grid/grid";
import { MODAL_BOX } from "@/lib/constants";
import { fetchUtilities } from "@/services/utilities";
import SchedulesGrid from "@home/schedules/components/grid";
import { GridColDef, GridRowParams } from "@lib/grid";
import { Box, Modal } from "@lib/mui";
import { UtilityAPI } from "@models/UtilityAPI";
import React, { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "utility_id", headerName: "Utility ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "state", headerName: "State", flex: 1, minWidth: 150 },
];
interface UtilitiesGridProps {
  // NOTE: Leaving this for future-proofing
}

const UtilitiesGrid: React.FC<UtilitiesGridProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [utilities, setUtilities] = useState([] as UtilityAPI[]);
  const [selectedUtility, setSelectedUtility] = useState({} as UtilityAPI);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const utilitiesData: any = await fetchUtilities(props);
      setUtilities(utilitiesData.items);
      setIsLoading(false);
    };
    fetchData();
  }, [props]);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      setSelectedUtility(event.row);
      setModalOpen(true);
    }
  };

  return (
    <>
      <CustomGrid
        loading={isLoading}
        rowCallback={handleRowClick}
        rows={utilities}
        columns={columns}
      ></CustomGrid>

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
          <SchedulesGrid schedules={selectedUtility.schedules} handleSchedule={()=>{}}/>
        </Box>
      </Modal>
    </>
  );
};
export default UtilitiesGrid;
