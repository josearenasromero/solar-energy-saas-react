"use client";
import CustomGrid from "@/components/grid/grid";
import { MODAL_BOX } from "@/lib/constants";
import { GridCellParams, GridColDef, GridRowParams } from "@lib/grid";
import { Box, Button, Grid, Modal } from "@lib/mui";
import { Company } from "@models/Company";
import { fetchCompanies } from "@services/companies";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlantsGrid from "../../plants/components/PlantsGrid";

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
            router.push(`/home/companies/${row.id}`);
          }}
          color="primary"
        >
          View Company
        </Button>
      </Grid>
      <Grid item>
        <Button color="primary">Edit</Button>
      </Grid>
    </Grid>
  );
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "qos_site_id", headerName: "QoS ID", flex: 1, minWidth: 150 },
  { field: "address1", headerName: "Address", flex: 1, minWidth: 150 },
  { field: "city", headerName: "City", flex: 1, minWidth: 150 },
  // {
  //   field: "utility",
  //   headerName: "Utility",
  //   flex: 1,
  //   minWidth: 150,
  //   valueGetter: (params) => params.row.utility?.name,
  // },
  // {
  //   field: "authorization",
  //   headerName: "Authorization",
  //   flex: 1,
  //   minWidth: 150,
  //   valueGetter: (params) =>
  //     params.row.authorization
  //       ? `${params.row.authorization?.utility} (${params.row.authorization?.utility_id})`
  //       : "",
  // },
];

interface CompaniesGridProps {
  // NOTE: Leaving this for future-proofing
}

const CompaniesGrid: React.FC<CompaniesGridProps> = (props) => {
  const [companies, setCompanies] = useState([] as Company[]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({} as Company);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const companiesData: any = await fetchCompanies(props);
      setCompanies(companiesData.items);
      setIsLoading(false);
    };
    fetchData();
  }, [props]);

  const handleRowClick = (event: GridRowParams) => {
    if (event.row) {
      setSelectedCompany(event.row);
      setModalOpen(true);
    }
  };

  return (
    <>
      <CustomGrid
        loading={isLoading}
        rowCallback={handleRowClick}
        rows={companies}
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
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
            <h2>{selectedCompany.name} Company</h2>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Button
                onClick={() => {
                  router.push(`/home/companies/${selectedCompany.id}`);
                }}
                style={{float: "right"}}
              >
                  Company Details
              </Button>
            </Grid>
          </Grid>
          <h2>Plants</h2>
          <PlantsGrid company_id={selectedCompany.id} />
        </Box>
      </Modal>
    </>
  );
};

export default CompaniesGrid;
