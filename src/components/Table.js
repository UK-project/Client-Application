import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import response from "../assets/response.json";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { countryActions } from "../store/country";

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
  { field: "OOH", headerName: "OOH", width: 150, type: "number" },
  { field: "Radio", headerName: "Radio", width: 150, type: "number" },
  { field: "Cinema", headerName: "Cinema", width: 150, type: "number" },
  { field: "Total", headerName: "Total", width: 150, type: "number" },
  { field: "Digital", headerName: "Digital", width: 150, type: "number" },
];

export default function DataGridDemo() {
  const tableRows = useSelector((state) => state.country.rows);

  return (
    <div style={{ height: "100%", width: "100%", color: "black" }}>
      <DataGrid
        rows={tableRows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
      />
    </div>
  );
}
