import React, { useState } from "react";
import GeoGitIcon from "../assets/GeoGitIcon.png";
import TopGithubUsers from "../components/TopGitHubUsers";
import LocationAutosuggest from "../components/LocationAutosuggest";

function Search() {
  const [city, setCity] = useState("");

  return (
    <>
      <main className="bg-thegray">
        <div className="min-h-screen flex items-center justify-center relative pb-32">
          <div className="relative">
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}
              <h1 className="text-center font-Mona font-bold text-white text-5xl leading-20 pb-6 max-w-2xl">
                Search
              </h1>
              <div className="">
                <LocationAutosuggest
                  selectedCity={city}
                  onCityChange={setCity}
                />
                <TopGithubUsers city={city} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
