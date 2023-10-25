import React, { useState } from "react";
import TopGithubUsers from "../components/TopGitHubUsers";
import LocationAutosuggest from "../components/LocationAutosuggest";
import Cobe from "../components/AutoGlobe";
import { GoPeople, GoRepo, GoGitPullRequest } from "react-icons/go";

function Search() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState([45, 10]);

  return (
    <>
      <main className="bg-thegray relative">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>{" "}
        </div>

        <div className="hidden lg:block">
          <Cobe coordinates={coordinates} />
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="pt-10 pb-6">
            <h1 className="font-Mona font-bold text-white text-5xl leading-20 pb-2">
              Search
            </h1>
            <div className="flex">
              <p className="font-Hublot text-gray-300 mr-4 max-w-[24rem] leading-[1.7rem]">
                Start by entering the city you want to rank developers from.
                Keep in mind, the results reflect the location users have
                entered themselves.
              </p>
              <p className="font-Hublot text-gray-300 hidden md:block">
                <span className="flex items-center mr-4 mb-1">
                  <GoPeople className="text-white" />
                  <span className="ml-2">Followers</span>
                </span>

                <span className="flex items-center mb-1">
                  <GoGitPullRequest className="text-white" />
                  <span className="ml-2">Public Commits</span>
                </span>

                <span className="flex items-center">
                  <GoRepo className="text-white" />
                  <span className="ml-2">Public Repos</span>
                </span>
              </p>
            </div>
          </div>

          <LocationAutosuggest
            selectedCity={city}
            onCityChange={(selectedCity, coords) => {
              setCity(selectedCity);
              setCoordinates(coords);
            }}
          />
        </div>

        <div className=" pt-2 "></div>

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
