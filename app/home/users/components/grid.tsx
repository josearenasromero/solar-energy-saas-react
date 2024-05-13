"use client";
import CustomGrid from "@/components/grid/grid";
import { GridCellParams, GridColDef } from "@lib/grid";
import { Button, Grid } from "@lib/mui";
import { User } from "@models/User";
import { fetchUsers } from "@services/users";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
            router.push(`/home/users/edit/${row.id}`);
          }}
          color="primary"
        >
          Edit
        </Button>
      </Grid>
      <Grid item>
        <Button color="error">Delete</Button>
      </Grid>
    </Grid>
  );
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email Address", flex: 1, minWidth: 150 },
  { field: "role", headerName: "Role", flex: 1, minWidth: 150 },
  {
    field: "options",
    headerName: "",
    renderCell: OptionsCell,
    flex: 1,
    minWidth: 250,
  },
];

interface UsersGridProps {
  // NOTE: Leaving this for future-proofing
}

const UsersGrid: React.FC<UsersGridProps> = (props) => {
  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    const fetchData = async () => {
      const usersData: any = await fetchUsers(props);
      setUsers(usersData.items);
    };
    fetchData();
  }, [props]);

  return users ? <CustomGrid rows={users} columns={columns} /> : "";
};

export default UsersGrid;
