import React, { useState,useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import Table from "./Table";
import BarChart from "./BarChart";
import DataControl from "./DataControl";
import { drawerStyles } from "../style/JssStyle";
import {
  changeResponseStructure,
  getCountries
} from '../helpers/helper'

import { useSelector, useDispatch } from "react-redux";
import {countryActions} from '../store/country'

import response from "../assets/response.json";

export default function MiniDrawer() {
  const classes = drawerStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch() 
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    const sheetData = {
      uploadedDate:response.data.uploaded_date,
      id:response.data.sheet_id,
      name:response.data.sheet_meta.sheet_name,
      code:response.data.sheet_meta.sheet_code
    }
    const sheet= changeResponseStructure(response)
    const dropDownValues = getCountries(sheet.tabs)
    const initialPayload = {
      sheetData,
      dropDownValues,
      tabsData:sheet.tabs
    }
    // console.log(sheet.tabs);
    dispatch(countryActions.initialSetup(initialPayload))
  },[])


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{
            paddingLeft: "0px",
          }}
        >
          <Button
            style={{
              background: "#f94a4a",
            }}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            {
              // Menu Item Icon
            }
            <MenuIcon style={{ fontSize: 56 }} />
          </Button>
          <Typography variant="h6" noWrap>
            Chart Visualizer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon
                style={{ fontSize: 50 }}
                color="secondary"
                // fontSize="large" => not recommended size
              />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div
          style={{
            width: "100%",
            height: "100px",
            background: "#2e3f47",
            margin: "20px",
            border: "2px solid #f94a4a",
            boxShadow: "3px 3px 5px 6px #f94a4a",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* data selection Area */}
          <DataControl />
        </div>
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#2e3f47",
            margin: "20px",
          }}
        >
          <Table />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "700px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "700px",
              // background: "white",
              margin: "20px",
              color: "white",
            }}
          >
            <BarChart />
          </div>
          <div
            style={{
              width: "100%",
              height: "700px",
              background: "white",
              margin: "20px",
              backgroundColor: "#2e3f47",
            }}
          >
            <p style={{ color: "black" }}>Chart 2</p>
          </div>
        </div>
      </main>
    </div>
  );
}
