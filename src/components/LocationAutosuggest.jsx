import React, { useState } from "react";
import Select from "react-select";
import { LOCATION_OPTIONS } from "../components/LocationOptions"; // Import the options

const customStyles = {
  container: (provided) => ({
    ...provided,
    marginBottom: "5rem",
    width: "400px", // Adjust the width to your desired value
    fontFamily: "Hublot-sans",
  }),
  control: (provided, state) => ({
    ...provided,
    background: "#070707",
    borderColor: state.isFocused ? "#ffffff" : "#808080",
    minHeight: "2rem",
    height: "2rem",
    boxShadow: state.isFocused ? "0 0 0 1px #ffffff" : "none",
    borderRadius: "15px",
    width: "400px", // Adjust the width here as well
    fontFamily: "Hublot-sans", // set font for the control
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "30px",
    padding: "0px 10px",
    fontFamily: "Hublot-sans", // set font for the value container
  }),
  input: (provided) => ({
    ...provided,
    margin: "10px",
    fontFamily: "Hublot-sans",
    color: "#ffffff", // set the input text color to white
    height: "40px", // Adjust the height to your desired value
    padding: "8px 10px 8px", // Adjust the padding as needed
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#9e9e9e",
      fontFamily: "Hublot-sans", // set font for the placeholder
    };
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#d6d6d6" : null,
    fontFamily: "Hublot-sans", // set font for the options
  }),
};

const LocationAutosuggest = ({ selectedCity, onCityChange }) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* Centered container */}
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
          onChange={(selectedOption) =>
            onCityChange(selectedOption ? selectedOption.value : "")
          }
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
