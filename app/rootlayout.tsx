"use client";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { SnackbarContextProvider } from "@contexts/SnackbarContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SnackbarContextProvider>
        <ThemeRegistry>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </ThemeRegistry>
      </SnackbarContextProvider>
    </SessionProvider>
  );
}
