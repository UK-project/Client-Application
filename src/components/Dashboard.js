import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
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
import MixedChart from "./MixedChart";
import StackChart from "./StackChart";
import DataControl from "./DataControl";
import { drawerStyles } from "../style/JssStyle";
import { changeResponseStructure, getCountries } from "../helpers/helper";

import { useDispatch } from "react-redux";
import { countryActions } from "../store/country";

import response from "../assets/response.json";

export default function MiniDrawer() {
  const classes = drawerStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const sheetData = {
      uploadedDate: response.data.uploaded_date,
      id: response.data.sheet_id,
      name: response.data.sheet_meta.sheet_name,
      code: response.data.sheet_meta.sheet_code,
    };
    const sheet = changeResponseStructure(response);
    const dropDownValues = getCountries(sheet.tabs);
    console.log("sheet", { sheet });
    const initialPayload = {
      sheetData,
      dropDownValues,
      tabsData: sheet.tabs,
    };
    dispatch(countryActions.initialSetup(initialPayload));
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#5E72E4" }}
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
              background: "#35CDEF",
              color: "#fff",
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
          <div>Chart Visualizer</div>
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
          {["Dashboard", "Profile"].map((text, index) => (
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
          {["Bar Chart", "Hybrid Chart", "Line Chart"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={classes.content}
        style={{
          width: "100%",
          padding: "0px",
        }}
      >
        <div
          className={classes.toolbar}
          style={{
            width: "100%",
            height: "600px",
            backgroundColor: "#5E72E4",
            zIndex: "20",
          }}
        />
        <div
          style={{
            padding: "20px",
            marginTop: "-500px",
            // backgroundColor:"#F2F4FA",
            zIndex: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "300px",
                height: "120px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: "30px",
              }}
            >
              11 Sheets
            </div>
            <div
              style={{
                width: "300px",
                height: "120px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: "30px",
              }}
            >
              102 Users
            </div>
            <div
              style={{
                width: "300px",
                height: "120px",
                backgroundColor: "white",
                borderRadius: "10px",
                marginRight: "30px",
              }}
            >
              13 Tabs
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <DataControl />
            <DataControl />
            <DataControl />
          </div>

          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#fff",
              marginBottom: "20px",
              // borderRadius:"20px",
              // padding:"10px"
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
                backgroundColor: "#F1F4F9",
              }}
            >
              <div style={{ width: "100%", padding: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#182B4D",
                    borderRadius: "20px",
                    padding: "10px",
                  }}
                >
                  <BarChart />
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "700px",
                backgroundColor: "#F1F4F9",
              }}
            >
              <div style={{ width: "100%", padding: "20px" }}>
                <div
                  style={{
                    backgroundColor: "#182B4D",
                    borderRadius: "20px",
                    padding: "10px",
                  }}
                >
                  <MixedChart />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "700px",
              backgroundColor: "#F1F4F9",
            }}
          >
            <div style={{ width: "100%", padding: "20px" }}>
              <div
                style={{
                  // color:"#f",
                  backgroundColor: "#182B4D",
                  borderRadius: "40px",
                  padding: "10px",
                  paddingTop:"30px"
                }}
              >
                <StackChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
