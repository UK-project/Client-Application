import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import response from "../assets/response.json";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "Year", headerName: "Year", width: 150 },
  { field: "TV", headerName: "TV", width: 150 },
  {
    field: "Newspapers",
    headerName: "Newspapers",
    type: "number",
    width: 160,
  },
  {
    field: "Magazines",
    headerName: "Magazines",
    description: "This column has a value getter and is not sortable.",
    type: "number",
    sortable: false,
    width: 160,
    //value getter
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, "firstName") || ""} ${
    //     params.getValue(params.id, "lastName") || ""
    //   }`,
  },
  { field: "OOH", headerName: "OOH", width: 150, type: "number", },
  { field: "Radio", headerName: "Radio", width: 150, type: "number", },
  { field: "Cinema", headerName: "Cinema", width: 150, type: "number", },
  { field: "Total", headerName: "Total", width: 150, type: "number", },
  { field: "Digital", headerName: "Digital", width: 150, type: "number", },
];

export default function DataGridDemo() {
  const [countryDropdownList, setCountryDropdownList] = useState([]);
  const [country, setCountry] = useState("australia");
  const [dataForCountries, setDataForCountries] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const forCountryData = changeResponseStructure(response);
    const dropDownValues = getCountries(forCountryData.tabs);
    setCountryDropdownList(dropDownValues);
    setDataForCountries(forCountryData.tabs);
  }, []);

  const handleCountryChangeHandler = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
    const selectedCountryData = dataForCountries.find(
      (el) => el.country === e.target.value
    );
    const visualizeDataRows = [];
    selectedCountryData.data_set.forEach((element) => {
      visualizeDataRows.push(element.data);
    });
    const final = [];
    visualizeDataRows.forEach((el) => {
      delete el.country;
      final.push(el);
    });
    console.log(final);
    setRows(final);
  };
  return (
    <div style={{ height: "100%", width: "100%", color: "black" }}>
      <select
        id="dropdown"
        value={country}
        onChange={handleCountryChangeHandler}
      >
        {countryDropdownList.map((el) => {
          return (
            <option key={el.id} value={el.country}>
              {el.country}
            </option>
          );
        })}
      </select>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
      />
    </div>
  );
}

const getCountries = (tabs) => {
  let dropdownValues = [];
  tabs.map((el) => {
    dropdownValues.push({ country: el.country, id: el.tab_id });
  });
  return dropdownValues;
};

// change to country centralized
const changeResponseStructure = (inputResponse) => {
  return {
    sheet_id: inputResponse.data.sheet_id,
    sheet_name: inputResponse.data.sheet_meta.sheet_name,
    sheet_code: inputResponse.data.sheet_meta.sheet_code,
    uploaded_date: inputResponse.data.uploaded_date,
    tabs: inputResponse.data.tabs.map((el) => ({
      tab_id: el.tab_id,
      country: el.tab_name,
      tab_topic: el.tab_topic,
      data_set: el.data_set.map((yl) => ({
        data_set_id: yl.data_set_id,
        data: {
          ...JSON.parse(yl.json_data),
          country: el.tab_name,
          id: yl.data_set_id,
        },
      })),
    })),
  };
};
