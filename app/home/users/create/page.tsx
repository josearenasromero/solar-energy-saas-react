"use client";
import CustomSnackbar from "@components/CustomSnackbar/CustomSnackbar";
import { Button, Grid } from "@lib/mui";
import { User } from "@models/User";
import { createUser } from "@services/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/form";

export default function Page() {
  const router = useRouter();

  const handleFormSubmit = async (data: User) => {
    const cratedUser = await createUser(data);
    if (cratedUser.id) {
      setOpen(true);
      setMessage(`Usuario ${cratedUser.name} creado exitosamente.`);
      router.push("/home/users");
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
          <h2>Create user</h2>
        </Grid>
        <Grid item mb={0}>
          <Button type="submit" form="userForm">
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid lg={12} item>
          <Form onFormSubmit={handleFormSubmit} />
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
