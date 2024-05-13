import CustomSnackbar from "@components/CustomSnackbar/CustomSnackbar";
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarContextProvider = ({ children }) => {
  const [settings, setSettings] = useState({ open: false });

  const showSnackbar = (message, severity = "success") => {
    setSettings({
      open: true,
      message,
      severity,
    });
    setTimeout(function () {
      hideSnackbar();
    }, 1500);
  };

  const hideSnackbar = () => {
    setSettings({ ...settings, open: false });
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <CustomSnackbar
        params={{
          open: settings.open,
          severity: settings.severity,
          onClose: hideSnackbar,
          message: settings.message,
        }}
      ></CustomSnackbar>
    </SnackbarContext.Provider>
  );
};

SnackbarContextProvider.propTypes = {
  children: PropTypes.any,
};
