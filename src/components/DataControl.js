import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countryActions } from "../store/country";

export default function DataControl() {
  const dispatch = useDispatch();
  const countryDropdownValues = useSelector(
    (state) => state.country.countryList
  );
  const selectedCountry = useSelector((state) => state.country.selectedCounty);

  const handleCountryChangeHandler = (e) => {
    dispatch(countryActions.changeTableDropdown({ selectedCounty: e.target.value }))
  };

  return (
    <div>
      <select
        id="dropdown"
        value={selectedCountry}
        onChange={handleCountryChangeHandler}
      >
        {countryDropdownValues.map((el) => {
          return (
            <option key={el.id} value={el.country}>
              {el.country}
            </option>
          );
        })}
      </select>
    </div>
  );
}
