import React, { useState } from "react";
import TopGithubUsers from "../components/TopGitHubUsers";
import LocationAutosuggest from "../components/LocationAutosuggest";
import Cobe from "../components/AutoGlobe";

function Search() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState([0, 0]);

  return (
    <>
      <main className="bg-thegray relative">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute -top-20 -right-6 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
          <div className="absolute -top-36 right-20 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
          <div className="absolute -top-24 right-72 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
          <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-40 -right-10 w-72 h-72 bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
        </div>

        <div className="hidden lg:block">
          <Cobe coordinates={coordinates} />
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="max-w-md pt-10 pb-6">
            <h1 className="font-Mona font-bold text-white text-5xl leading-20 pb-2 ">
              Search
            </h1>
            <p className="font-Hublot text-gray-300">
              Start by entering the location you want to rank GitHub users from.
              Keep in mind, the results reflect the location users have entered
              themselves.
            </p>
          </div>
          <LocationAutosuggest
            selectedCity={city}
            onCityChange={(selectedCity, coords) => {
              setCity(selectedCity);
              setCoordinates(coords);
            }}
          />
        </div>

        <div className="flex flex-col items-start justify-center relative pb-32 px-4 md:px-8 lg:px-32">
          <div className="relative z-1000 pt-0 pb-0">
            <TopGithubUsers city={city} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
