import React, { useState } from "react";
import Select from "react-select";
import { LOCATION_OPTIONS } from "../components/LocationOptions"; // Import the options

const customStyles = {
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  container: (provided) => ({
    ...provided,
    marginBottom: "0rem",
    fontFamily: "Hublot-sans",
    width: "15rem",
  }),
  input: (provided) => ({
    ...provided,
    color: "white", // Make the text you're typing white
  }),
  control: (provided, state) => ({
    ...provided,
    background: "#070707",
    fontFamily: "Hublot-sans", // set font for the control
    borderColor: state.isFocused ? "gray" : provided.borderColor, // change border color on focus
    boxShadow: state.isFocused ? "0 0 0 1px gray" : null, // remove blue border shadow
    color: "white",
    borderRadius: "0.75rem",

    "&:hover": {
      borderColor: "gray", // change border color on hover
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : provided.color, // adjust text color on selection
    backgroundColor: state.isFocused ? "gray" : null, // change background color on hover/focus
  }),
};

const LocationAutosuggest = ({ selectedCity, onCityChange }) => {
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Select
          styles={customStyles}
          className="basic-single"
          classNamePrefix="select"
          value={LOCATION_OPTIONS.find(
            (option) => option.value === selectedCity
          )}
          isClearable={false}
          isSearchable={true}
          name="location"
          options={LOCATION_OPTIONS}
          onChange={(selectedOption) => {
            onCityChange(
              selectedOption ? selectedOption.value : "",
              selectedOption ? selectedOption.coordinates : [0, 0] // default to [0,0]
            );
          }}
          isLoading={isLoading} // Pass the loading state here
        />
        <div
          style={{
            fontFamily: "Hublot-sans",
            color: "hsl(0, 0%, 40%)",
            display: "inline-block",
            fontSize: 12,
            fontStyle: "italic",
            marginTop: "1rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LocationAutosuggest;
