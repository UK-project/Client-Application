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

  barChart:{}
};

const countrySlice = createSlice({
  name: "country",
  initialState: initialCountryState,
  reducers: {
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
    changeTableDropdown(state, action) {
      state.selectedCounty = action.payload.selectedCounty;

      const selectedCountryData = state.countriesData.find(
        (el) => el.country === action.payload.selectedCounty
      );
      const visualizeDataRows = [];
      selectedCountryData.data_set.forEach((element) => {
        visualizeDataRows.push(element.data);
      });
      state.rows = visualizeDataRows;
    },
    changeBarChartDropdown(state,action){
      state.barChart = action.payload.barChartData
    }
  },
});

export const countryActions = countrySlice.actions;
export default countrySlice.reducer;
