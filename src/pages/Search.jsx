import React, { useState } from "react";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import TopGithubUsers from "../components/TopGitHubUsers";
import LocationAutosuggest from "../components/LocationAutosuggest";

function Search() {
  const [city, setCity] = useState("");

  return (
    <>
      <main className="bg-thegray">
        <div className=" flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-16">
          {/* Changed flex direction to column, items-start will align items to left in this case */}
          <h1 className="font-Mona font-bold text-white text-5xl leading-20 pb-0 max-w-2xl">
            Search
          </h1>
          <LocationAutosuggest selectedCity={city} onCityChange={setCity} />
        </div>

        <div className=" flex flex-col items-start justify-center relative pb-32 px-4 md:px-8 lg:px-16">
          <div className="relative z-1000 pt-0 pb-0">
            <TopGithubUsers city={city} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
