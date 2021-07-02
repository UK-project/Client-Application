import React, { useState, useEffect } from "react";

import { drawerStyles } from "../style/JssStyle";
import styles from "./Dashboard.module.css";

import { Bar, Mix, Stack } from "./ChartFactory";
import Table from "./Table";
import ChartFactory from "./ChartFactory";
import DataControl from "./DataControl";
import Card from "./DataCard";

import { changeResponseStructure, getCountries } from "../helpers/helper";
import { useDispatch } from "react-redux";
import { countryActions } from "../store/country";

import response from "../assets/response.json";

export default function Dashboard() {
  const classes = drawerStyles();
  const dispatch = useDispatch();


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
    <div >
      <div
        style={{
          width: "100%",
          padding: "0px",
          marginLeft:"70px"
        }}
      >
        <div
          className={classes.toolbar}
          style={{
            width: "100%",
            height: "600px",
            backgroundColor: "#5E72E4",
          }}
        />
        <div
          style={{
            padding: "20px",
            marginTop: "-500px",
          }}
        >
          <div className={styles.card_container}>
            <Card name="sheets" count="5" />
            <Card name="Users" count="102" />
            <Card name="Countries" count="31" />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <DataControl />
          </div>

          <div className={styles.table}>
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
            <div className={styles.chart_container_wrapper}>
              <div style={{ width: "100%", padding: "20px" }}>
                <div className={styles.chart_container}>
                  <ChartFactory type={Bar} />
                </div>
              </div>
            </div>
            <div className={styles.chart_container_wrapper}>
              <div style={{ width: "100%", padding: "20px" }}>
                <div className={styles.chart_container}>
                  <ChartFactory type={Mix} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.chart_container_wrapper}>
            <div style={{ width: "100%", padding: "20px" }}>
              <div className={styles.chart_container}>
                <ChartFactory type={Stack} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
