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
          <div className="absolute top-2 -right-64 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-10 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>{" "}
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
        <a
          href="https://github.com/sheeehy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-Hublot leading-5 tracking-wider pb-2 jack-sheehy"
        >
          Jack Sheehy :) <br />
          ©2023
        </a>
      </main>
    </>
  );
}

export default Search;
