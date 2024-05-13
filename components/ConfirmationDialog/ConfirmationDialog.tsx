"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@lib/mui";
import { ReactNode } from "react";

const ConfirmationDialog = ({
  params,
}: {
  params: {
    confirmationDialog: boolean;
    title: ReactNode;
    confirmCallback?: () => void;
    cancelCallback?: () => void;
  };
}) => {
  return (
    <div>
      <Dialog open={params.confirmationDialog}>
        <DialogTitle>{params.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={params.cancelCallback}>Cancel</Button>
          <Button onClick={params.confirmCallback}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
