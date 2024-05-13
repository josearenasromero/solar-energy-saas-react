"use client";
import {
  AccessTime as LogsIcon,
  Business as CompanyIcon,
  Home as HomeIcon,
  // DynamicForm as InverterIcon,
  Warning as IssueIcon,
  Logout as LogoutIcon,
  // ElectricMeter as MeasurementIcon,
  Menu as MenuIcon,
  MonetizationOn as RateIcon,
  Person as UserIcon
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const DRAWER_WIDTH = 240;
const HOME_ROUTE = "/home";
const SIDEBAR_LINKS = [
  { text: "Home", href: `${HOME_ROUTE}`, icon: HomeIcon },
  { text: "Users", href: `${HOME_ROUTE}/users`, icon: UserIcon },
  { text: "Companies", href: `${HOME_ROUTE}/companies`, icon: CompanyIcon },
  // { text: "Inverters", href: `${HOME_ROUTE}/inverters`, icon: InverterIcon },
  // { text: "Sensors", href: `${HOME_ROUTE}/sensors`, icon: SensorIcon },
  // {
  //   text: "Measurements",
  //   href: `${HOME_ROUTE}/measurements`,
  //   icon: MeasurementIcon,
  // },
  { text: "Utility Rates", href: `${HOME_ROUTE}/utility-rates`, icon: RateIcon },
  // { text: "Statements", href: `${HOME_ROUTE}/statements`, icon: StatementIcon },
  { text: "Issues", href: `${HOME_ROUTE}/issues`, icon: IssueIcon },
  { text: "Extraction Logs", href: `${HOME_ROUTE}/logs`, icon: LogsIcon },
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const buttonStyle = {
    color: "rgb(163 153 153)",
    border: "1px solid rgb(163 153 153)",
  };
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar sx={{ backgroundColor: "background.paper" }}>
          <Grid container spacing={3}>
            <Grid item>
              <IconButton
                style={buttonStyle}
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleToggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid mt={0.5} item>
              <Typography variant="h6" noWrap component="div" color="black">
                Solar ROI
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: "64px",
            height: "auto",
            bottom: 0,
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleToggleDrawer}
      >
        <Divider />
        <List>
          {SIDEBAR_LINKS.map(({ text, href, icon: Icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                onClick={() => {
                  handleToggleDrawer();
                }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
        <Button
          onClick={() => {
            signOut();
          }}
          variant="outlined"
          style={buttonStyle}
          startIcon={<LogoutIcon />}
        >
          Log Out
        </Button>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          paddingLeft: open ? `${DRAWER_WIDTH}px` : 0,
          transition: "padding-left 0.2s ease",
          p: 3,
          mt: "64px", // Adjust the top margin
        }}
      >
        {children}
      </Box>
    </div>
  );
}
