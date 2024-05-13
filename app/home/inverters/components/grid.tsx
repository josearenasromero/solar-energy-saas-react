"use client";
import CustomGrid from "@/components/grid/grid";
import { MODAL_BOX } from "@/lib/constants";
import { GridCellParams, GridColDef, GridRowParams } from "@lib/grid";
import { Box, Button, Grid, Modal } from "@lib/mui";
import { Inverter } from "@models/Inverter";
import { fetchInverters } from "@services/inverters";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeterInformation from "../../meters/components/MeterInformation";

interface OptionsCellProps {
  row: GridCellParams["row"];
}

function OptionsCell(props: OptionsCellProps) {
  const router = useRouter();
  const { row } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInverter, setSelectedInverter] = useState(0);
  const [authorizationId, setAuthorizationId] = useState(0);

  const handleOpenModal = () => {
    setModalOpen(true);
    setSelectedInverter(row.id);
    if (row.plant?.authorization?.id) {
      setAuthorizationId(row.plant?.authorization?.id);
    }
  };
  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button
          onClick={() => {
            router.push(`/home/inverters/${row.id}`);
          }}
          color="primary"
        >
          Details
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={handleOpenModal} color="primary">
          Assign Meter
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
          <h2>Assign Meter</h2>
          <MeterInformation
            selectedInverter={selectedInverter}
            authorization_id={authorizationId}
          />
        </Box>
      </Modal>
    </Grid>
  );
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Inverter ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  // { field: "serial", headerName: "Serial", flex: 1, minWidth: 150 },
  { field: "manufacturer", headerName: "Manufacturer", flex: 1, minWidth: 150 },
  { field: "model", headerName: "Model", flex: 1, minWidth: 150 },
  { field: "active", headerName: "Status", flex: 1, minWidth: 150 },
  // { field: "company_name", headerName: "Company", flex: 1, minWidth: 150 },
  // { field: "plant_name", headerName: "Plant Name", flex: 1, minWidth: 150 },
  // {
  //   field: "meter",
  //   headerName: "Meter",
  //   flex: 1,
  //   minWidth: 150,
  //   valueGetter: (params) =>
  //     params.row.meter
  //       ? `${params.row.meter?.service_identifier} (${params.row.meter?.id})`
  //       : "",
  // },
  // {
  //   field: "options",
  //   headerName: "",
  //   renderCell: OptionsCell,
  //   flex: 1,
  //   minWidth: 300,
  // },
];

interface InvertersGridProps {
  company_id?: string;
  plant_id?: string;
}

const InvertersGrid: React.FC<InvertersGridProps> = (props) => {
  const [inverters, setInverters] = useState([] as Inverter[]);
  const router = useRouter();
  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      router.push(`/home/inverters/${event.row.id}`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!props.plant_id) {
        return;
      }
      const invertersData: any = await fetchInverters(props);
      const inverters = invertersData.items.map((data: any) => {
        data.active = data.active ? "Active" : "Inactive";
        return data;
      });
      setInverters(inverters);
    };
    fetchData();
  }, [props]);

  return inverters ? <CustomGrid rowCallback={handleRowClick} rows={inverters} columns={columns} /> : "";
};

export default InvertersGrid;
