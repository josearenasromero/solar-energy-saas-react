"use client";
import CustomSnackbar from "@components/CustomSnackbar/CustomSnackbar";
import { Button, Grid } from "@lib/mui";
import { User } from "@models/User";
import { getUser, updateUser } from "@services/users";
import { useEffect, useState } from "react";
import Form from "../../components/form";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    const fetchData = async () => {
      const user: User = await getUser(params.id);
      setUser(user);
    };
    fetchData();
  }, [params.id]);

  const handleFormSubmit = async (data: User) => {
    const updatedUser = await updateUser(data);
    if (updatedUser.id) {
      setOpen(true);
      setMessage(`Usuario ${updatedUser.name} actualizado exitosamente.`);
    }
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid alignItems={"center"} container justifyContent={"space-between"}>
        <Grid item mb={0}>
          <h2>Edit user</h2>
        </Grid>
        <Grid item mb={0}>
          <Button type="submit" form="userForm">
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid lg={12} item>
          <Form user={user} onFormSubmit={handleFormSubmit} />
        </Grid>
      </Grid>

      <CustomSnackbar
        params={{
          open: open,
          onClose: handleClose,
          severity: "success",
          message: message,
        }}
      />
    </Grid>
  );
}
