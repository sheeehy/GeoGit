import React, { useState } from "react";
import Select from "react-select";
import { LOCATION_OPTIONS } from "../components/LocationOptions";
import { IoSearch } from "react-icons/io5";

//Search input custom styles
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
    color: "white",
    marginTop: "0px",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#070707",
    color: "white",
    borderColor: "gray",
    boxShadow: "0 0 0 1px gray",
    overflow: "hidden",
  }),
  menuList: (provided) => ({
    ...provided,
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For Internet Explorer and Edge
    "&::-webkit-scrollbar": {
      display: "none", // For Chrome, Safari and Opera
    },
  }),

  control: (provided, state) => ({
    ...provided,
    background: "#070707",
    fontFamily: "Hublot-sans",
    borderColor: state.isFocused ? "gray" : provided.borderColor,
    boxShadow: state.isFocused ? "0 0 0 1px gray" : null,
    color: "white",
    borderRadius: "0.5rem",
    "&:hover": {
      borderColor: "gray",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : provided.color,
    backgroundColor: state.isFocused ? "#171717" : null,
  }),
};

//Set loading Icon - needs work -
const LocationAutosuggest = ({ selectedCity, onCityChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const filterOption = (option, inputValue) => {
    return (
      inputValue.length >= 1 &&
      option.label.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  };

  const noOptionsMessage = ({ inputValue }) => {
    if (inputValue.length < 1) return null; // Don't show any message if less than 3 characters
    return "No Options";
  };

  const ValueContainer = ({ children, ...props }) => (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
      <IoSearch style={{ marginBottom: "0px", marginRight: "8px" }} />
      {children}
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Select
          placeholder=""
          components={{
            DropdownIndicator: null,
            ValueContainer,
          }}
          styles={customStyles}
          className="basic-single"
          classNamePrefix="select"
          value={LOCATION_OPTIONS.find(
            (option) => option.value === selectedCity
          )}
          isClearable={false}
          isSearchable={true}
          isLoading={isLoading}
          noOptionsMessage={noOptionsMessage}
          name="location"
          options={LOCATION_OPTIONS}
          filterOption={filterOption}
          onChange={(selectedOption) => {
            setIsLoading(true);
            onCityChange(
              selectedOption ? selectedOption.value : "",
              selectedOption ? selectedOption.coordinates : [0, 0]
            );
            setTimeout(() => {
              setIsLoading(false);
            }, 850);
          }}
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
