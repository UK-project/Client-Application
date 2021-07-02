// get countries in array
export const getCountries = (tabs) => {
  let dropdownValues = [];
  tabs.forEach((el) => {
    dropdownValues.push({ country: el.country, id: el.tab_id });
  });
  return dropdownValues;
};
export const getRowsFromTabsData = (tabsData, filterValue) => {};

// change to country centralized
export const changeResponseStructure = (inputResponse) => {
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
