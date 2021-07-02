import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countryActions } from "../store/country";
import { Dropdown } from "semantic-ui-react";

export default function DataControl() {
  const dispatch = useDispatch();
  const countryDropdownValues = useSelector(
    (state) => state.country.countryList
  );
  const selectedTab = useSelector((state) => state.country.selectedCounty);

  const handleCountryChangeHandler = (e, data) => {
    dispatch(
      countryActions.changeTableDropdown({ selectedCounty: data.value })
    );
  };
  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 180) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const [CountryOptions, setCountryOptions] = useState();
  useEffect(() => {
    console.log("dp", { countryDropdownValues });
    const arr = countryDropdownValues.map((co) => ({
      key: co.country.substring(0, 2),
      value: co.country,
      flag: co.country.substring(0, 2).toLowerCase(),
      text: co.country,
    }));
    console.log("arr", { arr });
    setCountryOptions(arr);
  }, [countryDropdownValues]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div
      style={
        scrolled
          ? {
              position: "fixed",
              zIndex: "2",
              marginTop: "-170px",
              width: "500px",
            }
          : { width: "500px", marginBottom: "10px" }
      }
    >
      <Dropdown
        placeholder="Select Country"
        fluid
        search
        selection
        options={CountryOptions}
        onChange={handleCountryChangeHandler}
      />
    </div>
  );
}
