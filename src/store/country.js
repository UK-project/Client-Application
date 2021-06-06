import { createSlice } from "@reduxjs/toolkit";

const initialCountryState = {
  sheetData: {},
  //selected tab
  selectedCounty: "",
  //tabList <- all tab id and relevant value (country name here)
  countryList: [],
  // all tabs data
  countriesData: [],
  //single tab data
  rows: [],
  //tabs structure
  columns: [],
};

const countrySlice = createSlice({
  name: "country",
  initialState: initialCountryState,
  reducers: {
    setDropdownValues(state, action) {
      state.countryList = action.payload;
      state.selectedCounty = state.countryList[0].country;
    },
    // set all tab data
    setCountries(state, action) {
      state.countriesData = action.payload;
      console.log(state.countriesData);
    },
    setRows(state, action) {
      state.selectedCounty = action.payload.selectedCounty;
      state.rows = action.payload.rows;
    },
    setColumns(state) {
      console.log("selected_country", state.selectedCounty);
      console.log("selected_rows", state.rows);
    },
    initialSetup(state, action) {
      state.sheetData = action.payload.sheetData;
      state.countryList = action.payload.dropDownValues;
      state.countriesData = action.payload.tabsData;
      state.selectedCounty = state.countryList[0].country;

      const selectedCountryData = state.countriesData.find(
        (el) => el.country === state.selectedCounty
      );
      const visualizeDataRows = [];
      selectedCountryData.data_set.forEach((element) => {
        visualizeDataRows.push(element.data);
      });
      state.rows = visualizeDataRows;
    },
    changeTableDropdown(state,action) {
      console.log(action.payload.selectedCounty);
      state.selectedCounty = action.payload.selectedCounty

      const selectedCountryData = state.countriesData.find(
        (el) => el.country === action.payload.selectedCounty
      );
      const visualizeDataRows = [];
      selectedCountryData.data_set.forEach((element) => {
        visualizeDataRows.push(element.data);
      });
      state.rows = visualizeDataRows;

    },
  },
});

export const countryActions = countrySlice.actions;
export default countrySlice.reducer;
