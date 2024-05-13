import MuiAlert from "@mui/material/Alert";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import React, { forwardRef } from "react";

const Alert = forwardRef(function Alert(
  {
    onClose,
    severity,
    message,
    ...otherProps
  }: {
    onClose: () => void;
    severity: "success" | "info" | "warning" | "error" | undefined;
    message: string;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      onClose={onClose}
      severity={severity}
      {...otherProps}
    >
      {message}
    </MuiAlert>
  );
});

const CustomSnackbar = ({
  params,
}: {
  params: {
    open: boolean;
    onClose: () => void;
    severity: "success" | "info" | "warning" | "error" | undefined;
    message: string;
  };
}) => {
  const anchorOrigin: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right",
  };

  return (
    <>
      <Snackbar
        open={params.open}
        autoHideDuration={3000}
        key={"bottomright"}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          onClose={params.onClose}
          severity={params.severity}
          message={params.message}
        />
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
